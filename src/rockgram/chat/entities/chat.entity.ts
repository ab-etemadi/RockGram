/* eslint-disable prettier/prettier */
import { UserChat } from 'src/rockgram/common/user-chat';
import { Message } from 'src/rockgram/message/entities/message.entity';
import { User } from 'src/rockgram/user/entities/user.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
    messages: Message[];




    // @ManyToMany(type => User, user => user.chats)    
    // users: User[];

    @OneToMany(() => UserChat, (userChat) => userChat.chat)
    public userChat: UserChat[];




}