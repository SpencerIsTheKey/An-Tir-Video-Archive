import { Like } from "typeorm";
import { Event } from "../entities/Event";
import { EventModel } from "../models/Event";
import { AppDataSource } from "../utils/data-source";
import { ActivityModel } from "../models/Activity";
import { TournamentModel } from "../models/Tournament";
import { VideoModel } from "../models/Video";

export const eventRepo = AppDataSource.getRepository(Event).extend({
    async createAndSave(temp: Event): Promise<EventModel|null>{
        try{
            await this.save(temp);
        } catch {
            return null;
        }
        return temp;
    },

    async findByName(name: string): Promise<Array<EventModel>>{
        const searchstring = '%' + name + '%';
        const searchResult = await this.find({
            where: {name: Like(searchstring)}
        });

        return searchResult;
    },

    async getAll(): Promise<EventModel[]> {
        return await this.find();
    },

    async isEvent(temp: unknown): Promise<boolean> {
        return (temp instanceof Event) ? true : false;
    },

    async addActivity(
        event: EventModel,
        adding: ActivityModel[]
    ): Promise<EventModel>{
        adding.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(Event, 'activities')
                .of(event.eventId)
                .add(elem.activityId);
        });
        return await this.findOne({where: {eventId: event.eventId}});
    },

    async addTournament(
        event: EventModel,
        adding: TournamentModel[]
    ): Promise<EventModel>{
        adding.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(Event, 'activities')
                .of(event.eventId)
                .add(elem.tournamentId);
        });
        return await this.findOne({where: {eventId: event.eventId}});
    },

    async addVideo(
        event: EventModel,
        adding: VideoModel[]
    ): Promise<EventModel>{
        adding.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(Event, 'activities')
                .of(event.eventId)
                .add(elem.videoId);
        });
        return await this.findOne({where: {eventId: event.eventId}});
    },

    async removeActivity(
        event: EventModel,
        removing: ActivityModel[]
    ): Promise<ActivityModel>{
        removing.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(Event, 'activities')
                .of(event.eventId)
                .remove(elem.activityId);
        });
        return await this.findOne({where: {eventId: event.eventId}});
    },

    async removeTournament(
        event: EventModel,
        removing: TournamentModel[]
    ): Promise<ActivityModel>{
        removing.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(Event, 'tournaments')
                .of(event.eventId)
                .remove(elem.tournamentId);
        });
        return await this.findOne({where: {eventId: event.eventId}});
    },

    async removeVideo(
        event: EventModel,
        removing: VideoModel[]
    ): Promise<ActivityModel>{
        removing.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(Event, 'videos')
                .of(event.eventId)
                .remove(elem.videoId);
        });
        return await this.findOne({where: {eventId: event.eventId}});
    },
});