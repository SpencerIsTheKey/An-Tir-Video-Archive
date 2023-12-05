import { Request, Response } from 'express';
import { getAllEvents, getActivities, getOneEvent, getPage } from '../services/eventService';
import { logger } from '../../utils/logger';

export const pageOfEvents = async(req: Request, res: Response): Promise<void> => {
    const serviceResult = await getPage(req.params['page']);
    res.status(serviceResult.status);
    res.send(serviceResult.result);
}

export const event = async(req: Request, res: Response): Promise<void> => {
    const serviceResult = await getOneEvent(req.params['event']);
    res.status(serviceResult.status);
    res.send(serviceResult.result);
}

export const events = async(req: Request, res: Response): Promise<void> => {
    const serviceResult = await getAllEvents();
    res.status(serviceResult.status);
    res.send(serviceResult.result);
}

export const activitiesAtEvent = async(req: Request, res: Response): Promise<void> => {
    const serviceResult = await getActivities(req.params['event']);
    res.status(serviceResult.status);
    res.send(JSON.stringify(serviceResult.result));
}