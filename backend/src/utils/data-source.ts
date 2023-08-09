import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../db/entities/User"
import { Activity } from "../db/entities/Activity";
import { Event } from "../db/entities/Event";
import { Tournament } from "../db/entities/Tournament";
import { Video } from "../db/entities/Video";

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: process.env.HOST,
    port: parseInt(process.env.DBPORT, 10),
    username: process.env.MYSQLUSER,
    database: process.env.DB,
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