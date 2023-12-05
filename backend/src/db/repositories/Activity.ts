import { Activity } from "../entities/Activity";
import { Like } from "typeorm";
import { ActivityModel } from "../models/Activity";
import { EventModel } from "../models/Event";
import { TournamentModel } from "../models/Tournament";
import { VideoModel } from "../models/Video";
import { AppDataSource } from "../../utils/data-source";

export const activityRepo = AppDataSource.getRepository(Activity).extend({

    async createAndSave(temp: Activity): Promise<ActivityModel|null> {
        try{
            await this.save(temp);
        } catch {
            return null;
        }
        return temp;
    },

    async findByName(name: string): Promise<ActivityModel[]> {
        const searchstring = '%' + name + '%';
        const searchResult = await this.find({
            where: {name: Like(searchstring)}
        });

        return searchResult;
    },

    async getAll(): Promise<ActivityModel[]> {
        return await this.find();
    },

    async getEventActivities(eventId: number): Promise<ActivityModel[]> {
        return await this
        .createQueryBuilder('activity')
        .innerJoin('activity.events', 'event')
        .where('event.eventId = :id', {id:eventId});
    },

    async isActivity(temp: unknown): Promise<boolean> {
        return (temp instanceof Activity) ? true : false;
    },

    async addEvent(
        activity: ActivityModel,
        adding: EventModel[]
    ): Promise<ActivityModel>{
        adding.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(Activity, 'events')
                .of(activity.activityId)
                .add(elem.eventId);
        });
        return await this.findOne({where: {activityId: activity.activityId}});
    },

    async addTournament(
        activity: ActivityModel,
        adding: TournamentModel[]
    ): Promise<ActivityModel>{
        adding.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(Activity, 'tournaments')
                .of(activity.activityId)
                .add(elem.tournamentId);
        });
        return await this.findOne({where: {activityId: activity.activityId}});
    },

    async addVideo(
        activity: ActivityModel,
        adding: VideoModel[]
    ): Promise<ActivityModel>{
        adding.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(Activity, 'videos')
                .of(activity.activityId)
                .add(elem.videoId);
        });
        return await this.findOne({where: {activityId: activity.activityId}});
    },

    async removeEvent(
        activity: ActivityModel,
        removing: EventModel[]
    ): Promise<ActivityModel>{
        removing.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(Activity, 'events')
                .of(activity.activityId)
                .remove(elem.eventId);
        });
        return await this.findOne({where: {activityId: activity.activityId}});
    },

    async removeTournament(
        activity: ActivityModel,
        removing: TournamentModel[]
    ): Promise<ActivityModel>{
        removing.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(Activity, 'events')
                .of(activity.activityId)
                .remove(elem.tournamentId);
        });
        return await this.findOne({where: {activityId: activity.activityId}});
    },

    async removeVideo(
        activity: ActivityModel,
        removing: VideoModel[]
    ): Promise<ActivityModel>{
        removing.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(Activity, 'events')
                .of(activity.activityId)
                .remove(elem.videoId);
        });
        return await this.findOne({where: {activityId: activity.activityId}});
    },
});