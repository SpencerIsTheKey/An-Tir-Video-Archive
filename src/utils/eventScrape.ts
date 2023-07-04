import axios, { AxiosError } from 'axios';
import { Event } from '../entities/Event';
import { activityRepo } from '../repositories/Activity';
import { Activity } from '../entities/Activity';
import * as cheerio from 'cheerio';
import { eventRepo } from '../repositories/Event';
import { arch } from 'os';
import { ActivityModel } from '../models/Activity';
import { Tournament } from '../entities/Tournament';
import { tournamentRepo } from '../repositories/Tournament';
import { EventModel } from '../models/Event';

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
        'Shenanigans',
        'Court'
    ];
    
    activities.forEach(async (activityName) => {
        let activity = new Activity();
        activity.name = activityName;
        console.log(await activityRepo.createAndSave(activity));
    });
    return null;
}

function addEvents(): Promise<void> {
    const eventsPage: Promise<string|undefined> = fetchPage('https://antir.org/events/');
    eventsPage.then((eventsPage) => {
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
                
                eventRepo.createAndSave(row_event).then(
                    (create_result) => {

                        //add activities

                        //Shenanigans are present at every event
                        let shenanigans: Promise<Array<ActivityModel>> =activityRepo.findByName('Shenanigans');
                        shenanigans.then((activity_array) => {eventRepo.addActivity(create_result, [activity_array[0]]);});

                        //add declared activities
                        var $activity_div = $($row_elem).find('.event-activities');
                        var $activity_logos = $($activity_div).find('i');
                        $activity_logos.each((_index, $activity_elem) => {
                            let logo_title_array = {
                                'Has Court': 'Court',
                                'has heavy fighting': 'Heavy',
                                'has youth activities': 'Youth Combat',
                                'has rapier and/or cut and thrust fighting': 'Rapier/C&T',
                                'has archery': 'Archery',
                                'has thrown weapons': 'Thrown Weapons',
                                'has bardic activites': 'Bardic'
                            };
                            if(logo_title_array.hasOwnProperty($activity_elem.attribs.title)){
                                let event_activity: Promise<Array<ActivityModel>> = activityRepo.findByName(logo_title_array[$activity_elem.attribs.title]);
                                event_activity.then((activity_array) => {
                                    eventRepo.addActivity(create_result, [activity_array[0]]);

                                    //add tournament for every activity but Court and Shenanigans
                                    if(logo_title_array[$activity_elem.attribs.title] != 'Court'){
                                        let activity_tournament = new Tournament();
                                        activity_tournament.event = create_result;
                                        activity_tournament.name = row_event.name + ' ' + logo_title_array[$activity_elem.attribs.title] + ' Tournament';
                                        activity_tournament.type = activity_array[0];
                                        tournamentRepo.createAndSave(activity_tournament);
                                    }
                                });
                            }
                        });

                        //get specific location
                        fetchPage($($row_elem).find('.event-description').attr('href')).then(
                            ($event_page) => {
                                let site_info = $($event_page).find('h3.event-heading').next().next().children().first().text().split('\n');
                                if(site_info.length == 5){
                                    if(site_info[3] == 'Online'){
                                        create_result.location = site_info[3];
                                    } else {
                                        create_result.location = `${site_info[site_info.length - 2].trim()} ${site_info[site_info.length - 1].trim()}`;
                                    }
                                    eventRepo.save(create_result);
                                }
                            }
                        );
                    }
                );            
            });
        });
    });
    return null;
};

export function getStartingData(): void {
    addActivities();
    addEvents();
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