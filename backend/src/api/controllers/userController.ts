import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import { serviceResult } from '../../utils/service_result';
import { UserModel } from '../../db/models/User';
import { updateUserService } from '../services/userService';


export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const user: UserModel = req.body;
    const serviceResult: void|serviceResult<any> = await updateUserService(user).catch((err) => {
        logger.error(err);
    });

    if (serviceResult) {
        if (serviceResult.isSuccessful) {
            res.status(200);
            res.send(serviceResult.result);
            logger.info('--> 200: update successful ');
        } else {
            res.status(400);
            res.send("Update unsuccessful")
            logger.info('--> 400: Update unsuccessful');
        }
    } else {
        res.status(500);
        res.send('500: unexpected error on server')
    }
}