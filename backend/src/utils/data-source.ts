import "reflect-metadata";
require('dotenv').config();
const config = require('./env.json')[process.env.ENV];
import { DataSource } from "typeorm";
import { User } from "../db/entities/User";
import { Activity } from "../db/entities/Activity";
import { Event } from "../db/entities/Event";
import { Tournament } from "../db/entities/Tournament";
import { Video } from "../db/entities/Video";

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: config.DB.HOST,
    port: parseInt(config.DB.DB_PORT, 10),
    username: config.DB.MYSQLUSER,
    database: config.DB.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        Activity,
        Event,
        Tournament,
        User,
        Video
    ],
    migrations: [],
    subscribers: [],
});