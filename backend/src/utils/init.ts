import { AppDataSource } from "./data-source";
import { getStartingData } from "./eventScrape";


AppDataSource.initialize().then( async () => {
    await getStartingData();
}).then(async () => {
    await AppDataSource.destroy()
}).then(() => {return null;});
