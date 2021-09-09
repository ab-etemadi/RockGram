
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./chat.entity";
import { Message } from "./message.entity";

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


    // addMessage(message: Message){
    //     if (this.messages == null) {
    //         this.messages = new Array<Message>();
    //     }
    //     this.messages.push(message)
    // }


    @JoinTable()
    @ManyToMany(type => Chat, (chat) => chat.users)
    chats: Chat[];










}