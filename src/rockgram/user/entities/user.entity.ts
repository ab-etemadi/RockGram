/* eslint-disable prettier/prettier */
import { UserChat } from "src/rockgram/user_chat/user-chat";
import { Message } from "src/rockgram/message/entities/message.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fullname: string;

    @Column()
    email: string;

    @Column()
    password?: string;

    @OneToMany(() => Message, message => message.user, {
        cascade: true
    })
    messages?: Message[];


    @OneToMany(() => UserChat, (userChat) => userChat.user)
    public userChat?: UserChat[];








}