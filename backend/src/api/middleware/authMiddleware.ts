import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const config = require('./env.json')[process.env.ENV];

export const SECRET_KEY: jwt.Secret = config.APP.JWT_SECRET;

export interface CustomRequest extends Request{
    token: string | jwt.JwtPayload;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = decoded;

        next();
    } catch (err) {
        res.status(401).send('401: Unauthorized. Please authenticate to authorize access');
    }
};