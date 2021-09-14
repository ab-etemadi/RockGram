/* eslint-disable prettier/prettier */
import { Chat } from "src/rockgram/chat/entities/chat.entity";
import { User } from "src/rockgram/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    text: string;

    @Column()
    date: string;

<<<<<<< HEAD
    @ManyToOne(() => User, user => user.id)
    user: number;
=======
    @ManyToOne(() => User, user => user.messages)
    user: User;
>>>>>>> 46f3d59b7eef163a6664f157e7e97140f2d6f785


    @ManyToOne(() => Chat, chat => chat.id)
    chat: number;

}