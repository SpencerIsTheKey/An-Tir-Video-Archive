import { EventModel } from "../../db/models/Event";
import { serviceResult } from "../../utils/service_result";
import { eventRepo } from "../../db/repositories/Event";
import { activityRepo } from '../../db/repositories/Activity';
import { logger } from "../../utils/logger";
import { ActivityModel } from "../../db/models/Activity";

export const getPage = async(page: number): Promise<serviceResult<EventModel[]>> => {
    let response = new serviceResult<EventModel[]>();
    try{
        const allEvents: EventModel[] = await eventRepo.getPage(page);
        logger.info(`200: successfully retrieved page ${page} of events`);
        response.isSuccessful = true;
        response.result = allEvents;
        response.status = 200;
    } catch (err: any) {
        logger.info('500: unable to retrieve events');
        response.isSuccessful = false;
        response.result = err;
        response.status = 500
    }
    return response;
}

export const getActivities = async(eventId: number): Promise<serviceResult<ActivityModel[]>> => {
    let response = new serviceResult<ActivityModel[]>();
    try{
        const eventActivities: ActivityModel[] = await activityRepo.getEventActivities(eventId);
        logger.info(eventActivities);
        logger.info('200: successfully retrieved event activities');
        response.isSuccessful = true;
        response.result = eventActivities;
        response.status = 200;
    } catch (err: any) {
        logger.info('500: unable to retrieve event activities');
        response.isSuccessful = false;
        response.result = err;
        response.status = 500
    }
    return response
}

export const getOneEvent = async(eventId: number): Promise<serviceResult<EventModel>> => {
    let response = new serviceResult<EventModel>();
    try{
        const event: EventModel = await eventRepo.findOne({where:{eventId: eventId}, relations:{activities: true}});
        logger.info('200: successfully retrieved event');
        response.isSuccessful = true;
        response.result = event;
        response.status = 200;
    } catch (err: any) {
        logger.info('500: unable to retrieve event');
        response.isSuccessful = false;
        response.result = err;
        response.status = 500
    }
    return response
}

export const getAllEvents = async(): Promise<serviceResult<EventModel[]>> => {
    let response = new serviceResult<EventModel[]>();
    try{
        const allEvents: EventModel[] = await eventRepo.getAll();
        logger.info('200: successfully retrieved events');
        response.isSuccessful = true;
        response.result = allEvents;
        response.status = 200;
    } catch (err: any) {
        logger.info('500: unable to retrieve events');
        response.isSuccessful = false;
        response.result = err;
        response.status = 500
    }
    return response;
}