import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './User';
import { Event } from './Event';
import { Activity } from './Activity';
import { Tournament } from './Tournament';

@Entity()
export class Video{
    @PrimaryGeneratedColumn('increment')
    videoId: number;

    @Column()
    url: string;

    @Column()
    name: string;

    @ManyToOne(() => User, (user) => user.videos)
    user: User;

    @ManyToOne(() => Event, (event) => event.videos)
    event: Event

    @ManyToOne(() => Activity, (activity) => activity.videos)
    activity: Activity;

    @ManyToOne(() => Tournament, (tourament) => tourament.videos)
    tournament: Tournament;
}