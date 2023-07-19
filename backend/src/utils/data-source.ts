import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../db/entities/User"
import { Activity } from "../db/entities/Activity";
import { Event } from "../db/entities/Event";
import { Tournament } from "../db/entities/Tournament";
import { Video } from "../db/entities/Video";

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "test",
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