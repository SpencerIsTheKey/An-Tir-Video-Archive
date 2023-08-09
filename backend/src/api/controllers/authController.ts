import {Request, Response} from 'express';
import 'reflect-metadata';
import { UserModel } from '../../db/models/User';
import { logger } from '../../utils/logger';
import { serviceResult } from '../../utils/service_result';
import { signInService, signupService } from '../services/authService';


export const signIn = async (req: Request, res: Response): Promise<void> => {
    const user: UserModel = req.body;
    const serviceResult: void | serviceResult<any> = await signInService(user).catch((err) => {
        logger.error(err);
    });

    if (serviceResult) {
        if (serviceResult.isSuccessful) {
            res.status(200);
            res.send(serviceResult.result);
            logger.info('--> 200: Successful signin ');
        } else {
            res.status(400);
            res.send("Sign in unseccessful.")
            logger.info('--> 400: Sign in unsuccessful');
        }
    } else {
        res.status(500);
        res.send('500: unexpected error on server')
    }
}

export const signUp = async (req: Request, res: Response): Promise<void> => {
    const user: UserModel = req.body;

    const serviceResult: void | serviceResult<any> = await signupService(user).catch((err) => {
        logger.error(err);
    });

    if (serviceResult) {
        if (serviceResult.isSuccessful) {
            res.status(201);
            res.send(serviceResult.result);
            logger.info('--> 201: User created successfully');
        } else {
            res.status(serviceResult.status);
            res.send(serviceResult.result);
        }
    }
}

