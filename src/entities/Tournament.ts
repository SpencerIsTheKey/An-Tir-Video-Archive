import { IsDateString } from 'class-validator';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Activity } from './Activity';
import { Video } from './Video';
import { Event } from './Event';

@Entity()
export class Tournament {
    @PrimaryGeneratedColumn('increment')
    tournamentId: number;

    @Column()
    name: string;

    @Column()
    @IsDateString()
    date: string;

    @OneToMany(() => Video, (video) => video.tournament, {cascade: true})
    videos: Video[];

    @ManyToOne(() => Activity, (activity) => activity.tournaments, {cascade: true})
    type: Activity;

    @ManyToOne(() => Event, (event) => event.tournaments, {cascade: true})
    event: Event;
}
