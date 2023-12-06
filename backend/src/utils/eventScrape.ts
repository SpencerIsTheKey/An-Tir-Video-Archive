import axios, { AxiosError } from 'axios';
import { Event } from '../db/entities/Event';
import { activityRepo } from '../db/repositories/Activity';
import { Activity } from '../db/entities/Activity';
import * as cheerio from 'cheerio';
import { eventRepo } from '../db/repositories/Event';
import { ActivityModel } from '../db/models/Activity';
import { Tournament } from '../db/entities/Tournament';
import { tournamentRepo } from '../db/repositories/Tournament';
import { EventModel } from '../db/models/Event';
import { AppDataSource } from './data-source';
import { logger } from './logger';

function fetchPage(url: string): Promise<string|undefined> {
    const HTMLData =
        axios.get(url)
        .then(res => res.data)
        .catch((error: AxiosError) => {
            console.error(`There was an error with ${error.config.url}.`);
            console.error(error.toJSON());
        });

    return HTMLData;
}

function addActivities(): void {
    const activities: Array<string> = [
        'Youth Combat',
        'Rapier/C&T',
        'Heavy',
        'Archery',
        'Thrown Weapons',
        'Bardic',
        'A&S',
        'Shenanigans',
        'Court'
    ];
    
    activities.forEach(async (activityName) => {
        let activity = new Activity();
        activity.name = activityName;
        await activityRepo.createAndSave(activity);
    });
    return null;
}

async function addEvents(): Promise<void> {
    try {
        const eventsPage: string | undefined = await fetchPage('https://antir.org/events');
        if (!eventsPage) {
            return;
        }

        const $ = cheerio.load(eventsPage);
        const $event_lists = $('.em-events-list');
        const $month_headers = $event_lists.find('h2');
        
        const promises = [];

        for (let i = 0; i < $month_headers.length; i++) {
            const $elem = $month_headers[i];
            // Element order is:
            //           title, button,      null,       table
            let $table = $elem.nextSibling.nextSibling.nextSibling;
            let $tbody = $($table).find('tbody');
            let $row = $($tbody).find('tr');

            for (let j = 0; j < $row.length; j++) {
                const $row_elem = $row[j];
                //don't include cancelled events
                if ($($row_elem).hasClass('cancelled')) {
                    continue;
                }
                //don't include deadlines
                if($($row_elem).find('.event-description').text().includes('Deadline')){
                    continue;
                }

                let date_array: Array<string> = $($elem).text().split(' ');

                // Scrape 3 years in advance
                if (parseInt(date_array[date_array.length - 1]) >= (new Date().getFullYear()) + 3) {
                    continue;
                }

                var row_event = new Event();

                var days = $($row_elem).find('.event-time').html().replace(/\s+/g, '').split('<br>')[0].split('-');
                var startDate = new Date(date_array[0] + ' ' + days[0] + ', ' + date_array[1]);
                var endDate = new Date(date_array[0] + ' ' + days[1] + ', ' + date_array[1]);
                row_event.startDate = startDate;
                row_event.endDate = (days.length > 1 ? endDate : startDate);

                row_event.name = $($row_elem).find('.event-description').text();

                let location_data: Array<string> = $($row_elem).find('.event-category-notes').text().split('(');
                row_event.host = location_data[0];
                row_event.location = location_data[1] ? location_data[1].split(')')[0] : '';

                const createResultPromise = await eventRepo.createAndSave(row_event).then(async (create_result) => {
                    // Add activities
                    // Shenanigans are present at every event
                    const shenanigans: Array<ActivityModel> = await activityRepo.findByName('Shenanigans');
                    create_result = await eventRepo.addActivity(create_result, [shenanigans[0]]);
        
                    // Add declared activities
                    var $activity_div = $($row_elem).find('.event-activities');
                    var $activity_logos = $($activity_div).find('i');
        
                    for (let k = 0; k < $activity_logos.length; k++) {
                        let $activity_elem = $activity_logos[k];
                        let logo_title_array = {
                            'Has Court': 'Court',
                            'has heavy fighting': 'Heavy',
                            'has youth activities': 'Youth Combat',
                            'has rapier and/or cut and thrust fighting': 'Rapier/C&T',
                            'has archery': 'Archery',
                            'has thrown weapons': 'Thrown Weapons',
                            'has bardic activities': 'Bardic',
                            'has arts and sciences activities': 'A&S'
                        };
                        if (logo_title_array.hasOwnProperty($activity_elem.attribs.title)) {
                            let event_activity: Array<ActivityModel> = await activityRepo.findByName(logo_title_array[$activity_elem.attribs.title]);
                            create_result = await eventRepo.addActivity(create_result, [event_activity[0]]);
        
                            // Add tournament for every activity but Court and Shenanigans
                            if (logo_title_array[$activity_elem.attribs.title] != 'Court') {
                                let activity_tournament = new Tournament();
                                activity_tournament.event = create_result;
                                activity_tournament.name = create_result.name + ' ' + logo_title_array[$activity_elem.attribs.title] + ' Tournament';
                                activity_tournament.type = event_activity[0];
                                await tournamentRepo.createAndSave(activity_tournament);
                            }
                        }
                    }
        
                    // Get specific location and check for keywords to add activities
                    create_result.url = $($row_elem).find('.event-description').attr('href');
                    let $event_page = await fetchPage(create_result.url);
                    let site_info = $($event_page).find('h3.event-heading').first().next().next().children().first().text().split('\n');
                    let eventSummary = $($event_page).find('h3.event-heading').first().next().next().children().text();
                    let eventSchedule = $($event_page).find('div.row').first().next().children().text();
                    let eventSummaryAndSchedule = `${eventSummary}\n${eventSchedule}`;

                    if (site_info.length == 5) {
                        if (site_info[3] == 'Online') {
                            create_result.location = site_info[3];
                        } else {
                            create_result.location = `${site_info[site_info.length - 2].trim()} ${site_info[site_info.length - 1].trim()}`;
                        }
                        create_result = await eventRepo.save(create_result);
                    }
                    
                    let keyword_array = {
                        "heavy": "Heavy",
                        "rapier": "Rapier/C&T",
                        "cut & thrust": "Rapier/C&T",
                        'C&T': "Rapier/C&T",
                        "bardic": "Bardic",
                        "archery": "Archery",
                        'class':'A&S'
                    }
                    
                    for (const keyword in keyword_array){
                        if(eventSummaryAndSchedule.toLowerCase().includes(keyword.toLowerCase())){
                            let keyword_activity: ActivityModel[] = await activityRepo.findByName(keyword_array[keyword]);
                            create_result = await eventRepo.findOne({where:{eventId:create_result.eventId}, relations:{activities:true}});

                            if (create_result.activities == undefined){
                                create_result = await eventRepo.addActivity(create_result, keyword_activity);
                            } else if (create_result.activities.filter((elem) => elem.name.toLowerCase() == keyword_activity[0].name.toLowerCase()).length == 0 ){
                                create_result = await eventRepo.addActivity(create_result, keyword_activity);
                            }
                        }
                    }
                });
                promises.push(createResultPromise);
            }
        }

        const eventsCreated = await Promise.all(promises);
        if (eventsCreated){
            return null;
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

export async function getStartingData(): Promise<void> {
    logger.info('Initializing database...');
    await addActivities();
    logger.info('Retrieving data from https://antir.org/events/ ...');
    await addEvents();
    logger.info("Event data retrieved!");
    return null;    
}

export async function updateDatabase(): Promise<void> {

    const events = await eventRepo.getAll();
    const eventsPage = await fetchPage('https://antir.org/events/');
    
    const $ = cheerio.load(eventsPage);
    const $event_lists = $('.em-events-list');
    const $month_headers = $event_lists.find('h2');
    $month_headers.each((_index, $elem) => {
        // Element order is:
        //           title, button,      null,       table
        let $table = $elem.nextSibling.nextSibling.nextSibling;
        let $tbody = $($table).find('tbody');
        let $row = $($tbody).find('tr');
        $row.each((_index, $row_elem ) => {
            if ($($row_elem).hasClass('cancelled')){return};
            let date_array: Array<string> = $($elem).text().split(' ');

            //scrape 3 years in advance
            if(parseInt(date_array[date_array.length-1]) >= (new Date().getFullYear()) + 3){return};

            var row_event = new Event();

            var days = $($row_elem).find('.event-time').html().replace(/\s+/g, '').split('<br>')[0].split('-');
            var startDate = new Date(date_array[0] + ' ' + days[0] + ', ' + date_array[1]);
            var endDate = new Date(date_array[0] + ' ' + days[1] + ', ' + date_array[1]);
            row_event.startDate = startDate;
            row_event.endDate = endDate;

            row_event.name = $($row_elem).find('.event-description').text();

            let location_data: Array<string> = $($row_elem).find('.event-category-notes').text().split('(');
            row_event.host = location_data[0];
            row_event.location = location_data[1] ? location_data[1].split(')')[0] : '';

            //get specific location
            fetchPage($($row_elem).find('.event-description').attr('href')).then(
                ($event_page) => {
                    let site_info = $($event_page).find('h3.event-heading').next().next().children().first().text().split('\n');
                    if(site_info.length == 5){
                        if(site_info[3] == 'Online'){
                            row_event.location = site_info[3];
                        } else {
                            row_event.location = `${site_info[site_info.length - 2].trim()} ${site_info[site_info.length - 1].trim()}`;
                        }
                    }
                }
            );

            //check to see if this event is already in the database
            let filtered: Array<EventModel> = events.filter((event) => {
                if(row_event.name == event.name)
                    if(row_event.startDate == event.startDate)
                        if (row_event.location == event.location)
                            return true;
                return false;
            });

            if(filtered.length == 1) {
                //update the event if there are changes
                if (JSON.stringify(row_event) !== JSON.stringify(filtered[0])){
                    row_event.eventId = filtered[0].eventId;
                    eventRepo.save(row_event);
                }
            } else {
                eventRepo.createAndSave(row_event);
            }
        });
    });
}