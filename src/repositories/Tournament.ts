import { Tournament } from "../entities/Tournament";
import { TournamentModel } from "../models/Tournament";
import { AppDataSource } from "../utils/data-source";


export const tournamentRepo = AppDataSource.getRepository(Tournament).extend({
    async createAndSave(temp: Tournament): Promise<TournamentModel|null> {
        try{
            await this.save(temp);
        } catch {
            return null;
        }
        return temp;
    },
});