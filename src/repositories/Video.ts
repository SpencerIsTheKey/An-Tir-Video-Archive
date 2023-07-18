import { Like } from "typeorm";
import { Video } from "../entities/Video";
import { VideoModel } from "../models/Video";
import { AppDataSource } from "../utils/data-source";
import { UserModel } from "../models/User";
import { EventModel } from "../models/Event";
import { TournamentModel } from "../models/Tournament";

export const videoRepo = AppDataSource.getRepository(Video).extend({
    async createAndSave(temp: Video): Promise<VideoModel|null> {
        try{
            await this.save(temp);
        } catch {
            return null;
        }
        return temp;
    },

    async searchByName(name: string): Promise<Array<VideoModel>>{
        const searchstring = '%' + name + '%';
        const searchResult = await this.find({
            where: {name: Like(searchstring)}
        });

        return searchResult;
    },

    async addUser(
        video: VideoModel,
        adding: UserModel
    ): Promise<VideoModel>{
        await this.createQueryBuilder()
            .relation(Video, 'user')
            .of(video.videoId)
            .add(adding.userId);
        return await this.findOne({where: {videoId: video.videoId}});
    },

    async removeUser(
        video: VideoModel,
        removing: UserModel
    ): Promise<VideoModel>{
        await this.createQueryBuilder()
            .relation(Video, 'user')
            .of(video.videoId)
            .remove(removing.userId);
        return await this.findOne({where: {videoId: video.videoId}});
    },

    async addEvent(
        video: VideoModel,
        adding: EventModel
    ): Promise<VideoModel>{
        await this.createQueryBuilder()
            .relation(Video, 'event')
            .of(video.videoId)
            .add(adding.eventId);
        return await this.findOne({where: {videoId: video.videoId}});
    },

    async removeEvent(
        video: VideoModel,
        removing: EventModel
    ): Promise<VideoModel>{
        await this.createQueryBuilder()
            .relation(Video, 'event')
            .of(video.videoId)
            .remove(removing.eventId);
        return await this.findOne({where: {videoId: video.videoId}});
    },

    async addTournament(
        video: VideoModel,
        adding: TournamentModel
    ): Promise<VideoModel>{
        await this.createQueryBuilder()
            .relation(Video, 'tournament')
            .of(video.videoId)
            .add(adding.tournamentId);
        return await this.findOne({where: {videoId: video.videoId}});
    },

    async removeTournament(
        video: VideoModel,
        removing: TournamentModel
    ): Promise<VideoModel>{
        await this.createQueryBuilder()
            .relation(Video, 'tournament')
            .of(video.videoId)
            .remove(removing.tournamentId);
        return await this.findOne({where: {videoId: video.videoId}});
    },

}); 