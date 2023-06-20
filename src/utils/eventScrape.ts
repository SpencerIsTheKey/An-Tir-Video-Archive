import axios, { AxiosError } from 'axios';
import { Event } from '../entities/Event';
import { activityRepo } from '../repositories/Activity';
import { Activity } from '../entities/Activity';
import * as cheerio from 'cheerio';

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

function extractEventData(doc: string): any{
    const $ = cheerio.load(doc);
    const $event_lists = $('.em-events-list');
    const $month_headers = $event_lists.find('h2');
    const events: Array<Event> = [];
    $month_headers.each((index, $elem) => {
        // Element order is:
        //           title, button,      null,       table
        let $table = $elem.nextSibling.nextSibling.nextSibling;
        let $tbody = $($table).find('tbody');
        let $row = $($tbody).find('tr');
        $row.each((index, $row_elem ) => {
            if ($($row_elem).hasClass('cancelled')){return};

            let date_array: Array<string> = $($elem).text().split(' ');

            if(parseInt(date_array[date_array.length-1]) >= (new Date().getFullYear()) + 3){return};

            date_array.splice(1, 0, $($row_elem).find('.event-time').html().replace(/\s+/g, '').split('<br>')[0]);
            var row_event = new Event();

            row_event.date = date_array.join(' ');
            
            row_event.name = $($row_elem).find('.event-description').text();
            let location_data: Array<string> = $($row_elem).find('.event-category-notes').text().split('(');
            row_event.host = location_data[0];
            row_event.location = location_data[1] ? location_data[1].split(')')[0] : '';
            console.log(row_event);
        });
    });
    return null;
}

function addActivities(): void {
    const activities: Array<string> = [
        'Youth Combat',
        'Rapier/C&T',
        'Heavy',
        'Archery',
        'Thrown Weapons',
        'Bardic',
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
    const eventPage: Promise<string|undefined> = fetchPage('https://antir.org/events/');
    eventPage.then((eventPage) => {
        return extractEventData(eventPage)
    }).then( );
    return null;
};

export function getStartingData(): void {
    addActivities();
    addEvents();
}