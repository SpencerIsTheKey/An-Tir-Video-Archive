import { UserModel } from "../../db/models/User";
import { serviceResult } from "../../utils/service_result";
import { userRepo } from "../../db/repositories/User";
import { logger } from "../../utils/logger";
import * as bcrypt from "bcrypt";


export const signupService = async(
    user: UserModel
): Promise<serviceResult<any>> => {
    const response = new serviceResult();

    const emailFind = await userRepo.findByEmail(user.email);
    const usernameFind = await userRepo.findByUsername(user.username);

    if (emailFind.length != 0 && usernameFind.length != 0){
        logger.info('409: email or username is already in use');
        response.isSuccessful = false;
        response.result = '409: email or username is already in use';
        response.status = 409;
    } else {
        bcrypt.hash(user.password, parseInt(process.env.SALTROUNDS))
            .then( async(hash:string) => {
                user.password = hash;
                response.result = await userRepo.createAndSave(user);
                response.isSuccessful = true;
                response.status = 201;
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
    const response = new serviceResult();

    const emailFind = await userRepo.findByEmail(user.email);

    if (emailFind.length != 0){
        //check password
        bcrypt.compare(user.password, emailFind[0].password)
            .then( (res: boolean) => {
                response.isSuccessful = res;
                response.result = res ? '200: OK' : '401: Unauthorized';
                response.status = res ? 200 : 401;
            })
    } else {
        response.result = '404: username or email not found';
        response.isSuccessful = false;
        response.status = 404;
    }

    return response;
}