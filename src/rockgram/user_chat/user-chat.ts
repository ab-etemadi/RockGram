/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "../chat/entities/chat.entity";
import { User } from "../user/entities/user.entity";

@Entity()
export class UserChat {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    userId: number;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    public user?: User;

    @Column()
    chatId: number;
  
    @ManyToOne(() => Chat)
    @JoinColumn({ name: 'chatId' })
    public chat?: Chat;
    
    // Custom Colums
    @Column()
    role: string;


}
