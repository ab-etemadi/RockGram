/* eslint-disable prettier/prettier */
import { UserChat } from "src/rockgram/user_chat/user-chat";
import { Message } from 'src/rockgram/message/entities/message.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    type: string;


    @OneToMany(() => Message, message => message.chat, {
        cascade: true
    })
    messages?: Message[];

    @OneToMany(() => UserChat, (userChat) => userChat.chat, {
        cascade: true
    })
    public userChat?: UserChat[];

}