import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Event } from './Event';
import { Tournament } from './Tournament';
import { Video } from './Video';

@Entity()
export class Activity {
    @PrimaryGeneratedColumn('increment')
    activityId: number;

    @Column()
    name: string

    @OneToMany(() => Tournament, (tournament) => tournament.type, {cascade: true})
    tournaments: Tournament[];

    @OneToMany(() => Video, (video) => video.activity, {cascade: true})
    videos: Video[];

    @ManyToMany(() => Event, {cascade: true})
    events: Event[];
}