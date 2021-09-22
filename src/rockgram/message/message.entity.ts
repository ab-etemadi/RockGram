/* eslint-disable prettier/prettier */
import { Chat } from "src/rockgram/chat/chat.entity";
import { User } from "src/rockgram/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    text: string;

    @Column()
    date: Date;

    @Column()
    userId: number;

    @ManyToOne(() => User,)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    chatId: number;

    @ManyToOne(() => Chat,)
    @JoinColumn({ name: 'chatId' })
    chat: Chat;

}