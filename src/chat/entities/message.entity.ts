import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./chat.entity";
import { User } from "./user.entity";

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    text: string;

    @Column()
    date: Date;

    @ManyToOne(() => User, user => user.messages)
    // @JoinColumn({name: 'user_id'})
    user: User;


    @ManyToOne(() => Chat, chat => chat.messages)
    chat: Chat;

}