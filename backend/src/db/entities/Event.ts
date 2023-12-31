import { 
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import {
    IsDateString
} from "class-validator";
import { Activity } from './Activity';
import { Tournament } from './Tournament';
import { Video } from './Video';

@Entity()
export class Event {
    @PrimaryGeneratedColumn('increment')
    eventId: number;

    @Column()
    name: string;

    @Column()
    location: string;

    @Column({type: 'timestamp', default: () => 'NOW()'})
    startDate: Date;

    @Column({type: 'timestamp', default: () => 'NOW()'})
    endDate: Date;

    @Column()
    host: string;

    @Column()
    url: string;
    
    @ManyToMany(() => Activity, {cascade: true})
    @JoinTable()
    activities: Activity[];

    @OneToMany(() => Tournament, (tournament) => tournament.event, {cascade: true})
    tournaments: Tournament[];

    @OneToMany(() => Video, (video) => video.event, {cascade: true})
    videos: Video[];

}