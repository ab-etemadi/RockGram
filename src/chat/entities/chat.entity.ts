import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";
import { User } from "./user.entity";

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

    @ManyToMany(type => User, user => user.chats)    
    users: User[];


}