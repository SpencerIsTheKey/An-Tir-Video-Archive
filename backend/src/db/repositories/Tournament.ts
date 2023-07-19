import { BSONSymbol, Between, Like } from "typeorm";
import { Tournament } from "../entities/Tournament";
import { TournamentModel } from "../models/Tournament";
import { AppDataSource } from "../utils/data-source";
import { VideoModel } from "../models/Video";
import { EventModel } from "../models/Event";
import { ActivityModel } from "../models/Activity";


export const tournamentRepo = AppDataSource.getRepository(Tournament).extend({
    async createAndSave(temp: Tournament): Promise<TournamentModel|null> {
        try{
            await this.save(temp);
        } catch {
            return null;
        }
        return temp;
    },

    async searchByName(name: string): Promise<Array<TournamentModel>>{
        const searchstring = '%' + name + '%';
        const searchResult = await this.find({
            where: {name: Like(searchstring)}
        });

        return searchResult;
    },

    async searchByDate(rangeStart: Date, rangeEnd: Date): Promise<Array<TournamentModel>> {
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

    async isTournament(temp: unknown): Promise<boolean> {
        return (temp instanceof Tournament) ? true : false;
    },

    async addEvent(
        tournament: TournamentModel,
        adding: EventModel
    ): Promise<TournamentModel>{
        await this.createQueryBuilder()
            .relation(Tournament, 'event')
            .of(tournament.tournamentId)
            .add(adding.eventId);
        return await this.findOne({where: {tournamentId: tournament.tournamentId}});
    },

    async removeEvent(
        tournament: TournamentModel,
        removing: EventModel
    ): Promise<ActivityModel>{
        await this.createQueryBuilder()
            .relation(Tournament, 'event')
            .of(tournament.tournamentId)
            .remove(removing.eventId);
        return await this.findOne({where: {tournamentId: tournament.tournamentId}});
    },

    async addActivity(
        tournament: TournamentModel,
        adding: ActivityModel
    ): Promise<TournamentModel>{
        await this.createQueryBuilder()
            .relation(Tournament, 'activity')
            .of(tournament.tournamentId)
            .add(adding.activityId);
        return await this.findOne({where: {tournamentId: tournament.tournamentId}});
    },

    async removeActivity(
        tournament: TournamentModel,
        removing: ActivityModel
    ): Promise<ActivityModel>{
        await this.createQueryBuilder()
            .relation(Tournament, 'activity')
            .of(tournament.tournamentId)
            .remove(removing.activityId);
        return await this.findOne({where: {tournamentId: tournament.tournamentId}});
    },

    async addVideo(
        tournament: TournamentModel,
        adding: VideoModel[]
    ): Promise<TournamentModel>{
        adding.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(Tournament, 'videos')
                .of(tournament.tournamentId)
                .add(elem.videoId);
        });
        return await this.findOne({where: {tournamentId: tournament.tournamentId}});
    },

    async removeVideo(
        tournament: TournamentModel,
        removing: VideoModel[]
    ): Promise<ActivityModel>{
        removing.forEach(async (elem) => {
            await this.createQueryBuilder()
                .relation(Tournament, 'videos')
                .of(tournament.tournamentId)
                .remove(elem.videoId);
        });
        return await this.findOne({where: {tournamentId: tournament.tournamentId}});
    },


});