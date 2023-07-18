import { Like } from "typeorm";
import { User } from "../entities/User";
import { UserModel } from "../models/User";
import { AppDataSource } from "../utils/data-source";
import { VideoModel } from "../models/Video";

export const userRepo = AppDataSource.getRepository(User).extend({

    async createAndSave(temp: User): Promise<UserModel|null> {
        try{
            await this.save(temp);
        } catch {
            return null;
        }
        return temp;
    },

    async findByUsername(username: string): Promise<UserModel[]> {
        const searchstring = '%' + username + '%';
        const searchResult = await this.find({
            where: {username: Like(searchstring)}
        });

        return searchResult;
    },

    async findByEmail(email: string): Promise<UserModel[]> {
        const searchstring = '%' + email + '%';
        const searchResult = await this.find({
            where: {email: Like(searchstring)}
        });

        return searchResult;
    },

    async getAll(): Promise<UserModel[]> {
        return await this.find();
    },

    async isUser(temp: unknown): Promise<boolean> {
        return (temp instanceof User) ? true : false;
    },

    async addVideo(
        user: UserModel,
        adding: VideoModel[]
    ): Promise<UserModel>{
        adding.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(User, 'videos')
                .of(user.userId)
                .add(elem.videoId);
        });
        return await this.findOne({where: {userID: user.userId}});
    },

    async removeVideo(
        user: UserModel,
        removing: VideoModel[]
    ): Promise<UserModel>{
        removing.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(user, 'videos')
                .of(user.userId)
                .remove(elem.videoId);
        });
        return await this.findOne({where: {userID: user.userId}});
    },
});
