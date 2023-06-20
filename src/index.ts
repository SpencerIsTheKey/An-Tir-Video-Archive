import { AppDataSource } from "./utils/data-source"
import { getStartingData } from "./utils/eventScrape"

AppDataSource.initialize().then(async () => {
    getStartingData();
}).catch(error => console.log(error))

