import { Request, Response } from 'express';
import { getAll } from '../services/eventService';

export const getEvents = async(req: Request, res: Response): Promise<void> => {
    const serviceResult = await getAll(); 

    res.satus = serviceResult.status;
    res.send(serviceResult.result);

}