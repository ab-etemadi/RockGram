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
    date: Date;

    @ManyToOne(() => User, user => user.messages)
    user: User;


    @ManyToOne(() => Chat, chat => chat.messages)
    chat: Chat;

}