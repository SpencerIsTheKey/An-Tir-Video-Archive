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

    @ManyToOne(() => User, (user) => user.videos, {cascade: true})
    user: User;

    @ManyToOne(() => Event, (event) => event.videos, {cascade: true})
    event: Event

    @ManyToOne(() => Activity, (activity) => activity.videos, {cascade: true})
    activity: Activity;

    @ManyToOne(() => Tournament, (tourament) => tourament.videos, {cascade: true})
    tournament: Tournament;
}