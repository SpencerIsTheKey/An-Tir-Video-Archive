import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Activity } from "../entities/Activity";
import { Event } from "../entities/Event";
import { Tournament } from "../entities/Tournament";
import { Video } from "../entities/Video";

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