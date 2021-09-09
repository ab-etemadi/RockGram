/* eslint-disable prettier/prettier */
import { Chat } from "src/rockgram/chat/entities/chat.entity";
import { UserChat } from "src/rockgram/common/user-chat";
import { Message } from "src/rockgram/message/entities/message.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fullname: string;

    @Column()
    email: string;

    @Column()
    password: string

    @OneToMany(() => Message, message => message.user, {
        cascade: true
    })
    messages: Message[];



    // @JoinTable()
    // @ManyToMany(type => Chat, (chat) => chat.users)
    // chats: Chat[];


    @OneToMany(() => UserChat, (userChat) => userChat.user)
    public userChat: UserChat[];








}