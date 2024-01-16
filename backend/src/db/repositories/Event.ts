import { Between, Like } from "typeorm";
import { Event } from "../entities/Event";
import { EventModel } from "../models/Event";
import { AppDataSource } from "../../utils/data-source";
import { ActivityModel } from "../models/Activity";
import { TournamentModel } from "../models/Tournament";
import { VideoModel } from "../models/Video";
import { logger } from "../../utils/logger";
import { Activity } from "../entities/Activity";
import { revalidateEventsPage } from "../../utils/revalidate";

export const eventRepo = AppDataSource.getRepository(Event).extend({
    async createAndSave(temp: Event): Promise<EventModel|null>{
        try{
            await this.save(temp);
            revalidateEventsPage();
        } catch {
            return null;
        }
        return await this.findOne({where:{eventId:temp.eventId}, relations:{activities:true}});
    },

    async searchByName(name: string): Promise<Array<EventModel>>{
        const searchstring = '%' + name + '%';
        const searchResult = await this.find({
            where: {name: Like(searchstring)}
        });

        return searchResult;
    },

    async searchByStartDate(rangeStart: Date, rangeEnd: Date): Promise<Array<EventModel>> {
        const searchResult = await this.find({
            where: {
                startDate: Between(
                    rangeStart,
                    rangeEnd
                ),
            }
        });
        return searchResult;
    },

    async searchByEndDate(rangeStart: Date, rangeEnd: Date): Promise<Array<EventModel>> {
        const searchResult = await this.find({
            where: {
                endDate: Between(
                    rangeStart,
                    rangeEnd
                ),
            }
        });
        return searchResult;
    },

    async getAll(): Promise<EventModel[]> {
        return await this.createQueryBuilder("event")
            .leftJoinAndSelect("event.activities", "activity")
            .loadRelationCountAndMap('event.videoCount', 'event.videos')
            .getMany();
    },

    async getPage(page: number): Promise<EventModel[]> {
        return await this
            .find({
                skip: (page-1)*20 ,
                take: 20,
                relations: {
                    activities: true
                }
            });
    },

    async getActivities(eventId: number): Promise<ActivityModel[]> {
        return await this.
            createQueryBuilder('activity')
            .leftJoinAndSelect('events', 'event')
            .where({'eventId': eventId})
    },

    async isEvent(temp: unknown): Promise<boolean> {
        return (temp instanceof Event) ? true : false;
    },

    async addActivity(
        event: EventModel,
        adding: ActivityModel[]
    ): Promise<EventModel>{
        adding.forEach(async (elem) => {
            const currentActivities = await this.getActivities(event.eventId);
            const jsonElem = JSON.stringify(elem);
            let activityPresent = false;
            for(let i = 0; i==currentActivities.length; i++){
                let jsonCurrentActivity = JSON.stringify(currentActivities[i]);
                if (jsonElem['activityId'] == jsonCurrentActivity["activityId"]){
                    activityPresent = true;
                }
            }
            if (!activityPresent){
                await this.createQueryBuilder()
                .relation(Event, 'activities')
                .of(event.eventId)
                .add(elem.activityId);
            }
        });
        return await this.findOne({where:{eventId:event.eventId}, relations:{activities:true}});
    },

    async addTournament(
        event: EventModel,
        adding: TournamentModel[]
    ): Promise<EventModel>{
        adding.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(Event, 'tournaments')
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
                .relation(Event, 'videos')
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