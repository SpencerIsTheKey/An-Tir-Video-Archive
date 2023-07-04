import { AppDataSource } from "./utils/data-source";
import { getStartingData, updateDatabase } from "./utils/eventScrape";
import * as cron from 'node-cron';

AppDataSource.initialize().then(async () => {
    getStartingData();
    cron.schedule('0 0 * * 0', () => {updateDatabase()});
}).catch(error => console.log(error));

