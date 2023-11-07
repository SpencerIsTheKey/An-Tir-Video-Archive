import { EventModel } from "../../db/models/Event";
import { serviceResult } from "../../utils/service_result";
import { eventRepo } from "../../db/repositories/Event";
import { logger } from "../../utils/logger";

export const getAll = async(): Promise<serviceResult<EventModel[]>> => {
    let response = new serviceResult<EventModel[]>();

    const allEvents = await eventRepo.getAll();

    if (allEvents) {
        logger.info('201: successfully retrieved events');
        response.isSuccessful = true;
        response.result = allEvents;
        response.status = 201;
    } else {
        logger.info('500: unable to retrieve events');
        response.isSuccessful = false;
        response.result = allEvents;
        response.status = 500
    }

    return response;
}