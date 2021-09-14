/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "../chat/entities/chat.entity";
import { User } from "../user/entities/user.entity";

@Entity()
export class UserChat {
    @PrimaryGeneratedColumn()
    id?: number;
    
    @ManyToOne(() => User, (user) => user.userChat)
    public user: User;
    
    @ManyToOne(() => User, (chat) => chat.userChat)
    public chat: Chat;
    
    // Custom Colums
    @Column()
    role: string;


}
