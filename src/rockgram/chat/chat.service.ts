/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserChat } from "src/rockgram/user_chat/user-chat";
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';
import { ChatRepository } from './repository/chatRepository';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepo: Repository<Chat>,
        private customChatRepo : ChatRepository,
        @InjectRepository(UserChat)
        private readonly userChatRepos: Repository<UserChat>
    ){}

    getAllChats(){
        return this.chatRepo.find({ relations: ["userChat","messages"]});
    }

    getAllChatsByType(user: number, type: string){
       const chats = this.chatRepo.find({where: {type: type}})
       return chats;
    }


    async createChat(createChatDto: CreateChatDto, usersChat: UserChat[]){
        createChatDto.userChat = usersChat;
        return await this.customChatRepo.createChat(createChatDto);
    }

    async deleteChat(chatId: number, userId: number){
        const userChat = await this.userChatRepos.find({where: {chatId:chatId, userId:userId}});
        return this.userChatRepos.remove(userChat);
    }
}
