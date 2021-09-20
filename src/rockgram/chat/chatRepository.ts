import { Injectable } from "@nestjs/common";
import {  CreateGroupChatDto } from './dto/create-group-chat.dto';
import { AbstractRepository, EntityRepository, Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Chat } from "./chat.entity";
import { CreatePersonalChatDto } from "./dto/create-personal-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { Request } from "express";

@Injectable()
@EntityRepository(Chat)
export class ChatRepository extends AbstractRepository<Chat>{
    
    public async createPersonalChat(createPersonalChatDto: CreatePersonalChatDto, userId: number, name: string): Promise<Chat>{
        const  { memberId } = createPersonalChatDto;
        const chat = new Chat();
        chat.name = name;
        chat.date = new Date();
        chat.type = "personal"; 
        chat.userChat =  [{userId: userId, role: "admin"},{userId: memberId, role: "admin"}];

        console.log(chat)
        this.repository.create(chat);
        await this.repository.save(chat);
        return chat;
    }

    public async createGroupChat(createGroupChatDto: CreateGroupChatDto, userId: number): Promise<Chat>{
        let { name, type , userChat, membersId } = createGroupChatDto;
        type = "group";
        userChat = [{userId: userId, role: "admin"}];
        for (let i = 0; i < membersId.length; i++) {
            userChat.push({userId: membersId[i], role: "member"});
        }

        const chat = new Chat();
        chat.name = name;
        chat.type = type; 
        chat.userChat = userChat;
        chat.date = new Date();

        this.repository.create(chat);
        await this.repository.save(chat);
        return chat;
    }

    public async searchChat(req : Request, userId: number){
        console.log("searchMethod called");
        const builder = this.repository.createQueryBuilder('chats');
        if(req.query.s){
            builder.innerJoinAndSelect('chats.userChat', 'userChat')
            .where("chats.name LIKE :s", {s: `%${req.query.s}%`})
            .andWhere("userChat.userId LIKE :i", {i: `%${userId}%`});
        }
        return await builder.getMany();
    }

    public async updateGroupChat(updateChatDto: UpdateChatDto, chatId:number): Promise<Chat>{
        const { name } = updateChatDto;
        const chat = await this.repository.findOne(chatId);
        chat.name = name;
        await this.repository.save(chat);
        return chat;
    }




}