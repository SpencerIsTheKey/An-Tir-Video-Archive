import {
    Column,
    Entity,
    JoinTable,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import {
    IsEmail
} from "class-validator";

import { Video } from './Video';

@Entity()
export class User{
    @PrimaryGeneratedColumn('increment')
    userId: number;

    @Column()
    username: string;

    @Column()
    password: string

    @Column()
    @IsEmail()
    email: string;

    @OneToMany(() => Video, (video) => video.user, {cascade: true})
    videos: Video[]
}