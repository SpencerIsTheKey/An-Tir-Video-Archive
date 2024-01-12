const config = require('./env.json')[process.env.ENV];
import { UserModel } from "../../db/models/User";
import { serviceResult } from "../../utils/service_result";
import { userRepo } from "../../db/repositories/User";
import { logger } from "../../utils/logger";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from "bcrypt";


const signJWT = (user: UserModel): serviceResult<any> => {
    const response = new serviceResult();

    const payload = {
        email: user.email
    };
    const token = jwt.sign(payload, config.APP.JWT_SECRET, {expiresIn: '3 hours'});
    response.isSuccessful = true;
    response.result = {user: {email: user.email}, token };
    response.status = 200;

    return response;
}

export const signupService = async(
    user: UserModel
): Promise<serviceResult<any>> => {
    let response = new serviceResult();

    const emailCount = await userRepo.count({where: {email:user.email}});
    const usernameCount = await userRepo.count({where: {username:user.username}});

    if (emailCount != 0 && usernameCount != 0){
        logger.info('409: email or username is already in use');
        response.isSuccessful = false;
        response.result = '409: email or username is already in use';
        response.status = 409;
    } else {
        bcrypt.hash(user.password, parseInt(config.APP.SALTROUNDS))
            .then( async(hash:string) => {
                user.password = hash;
                user = await userRepo.createAndSave(user);

                response = signJWT(user);

            }).catch((err: Error) => {
                logger.error(err);
                response.isSuccessful = false;
                response.result = err.message;
                response.status = 500;
            })
    }

    return response;
}

export const signInService = async(
    user: UserModel
): Promise<serviceResult<any>> => {
    let response = new serviceResult();

    const count = await userRepo.count({where: {email:user.email}});

    if (count != 0){
        //check password

        const isSamePass = await userRepo.checkUserPass(user.email, user.password)
            .catch((err:Error) => {logger.error(err); return false;});
        
        if (isSamePass) {
            response = signJWT(user);
        } else{
            response.isSuccessful = false;
            response.result = '401: Unauthorized';
            response.status = 401
        }
    } else {
        response.result = '404: username or email not found';
        response.isSuccessful = false;
        response.status = 404;
    }

    return response;
}