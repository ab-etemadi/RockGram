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

    @ManyToOne(() => User, user => user.messages)
    user: number;

    @ManyToOne(() => Chat, chat => chat.id)
    chat: number;

}