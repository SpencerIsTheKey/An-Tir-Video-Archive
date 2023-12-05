require('dotenv').config()
import { AppDataSource } from "./utils/data-source"
import { getStartingData, updateDatabase } from "./utils/eventScrape";
import * as cron from 'node-cron';
import { logger } from "./utils/logger";
import * as express from 'express';
import { authRouter } from "./api/routers/authRoutes";
import { eventRouter } from "./api/routers/eventRoutes";

const KEY = process.env.KEY;

const APP = express();
const PORT = process.env.PORT || 3000;
// APP.use(bodyParser.json());
// APP.use(bodyParser.urlencoded({ extended: false }));



AppDataSource.initialize().then(async () => {
    cron.schedule('0 0 * * 0', () => {updateDatabase()});

    APP.listen(PORT, () => {
      return logger.info('Started server listening on port ' + PORT);
    });
    
    APP.use('/auth', authRouter);
    APP.use('/events', eventRouter);
    // APP.use('/tournament', tournamentRouter);
    // APP.use('/user', userRouter);
    // APP.use('/video', videoRouter);
}).catch(error => console.log(error));

