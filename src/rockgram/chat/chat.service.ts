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
        private customChatRepo : ChatRepository
    ){}

    getAllChats(){
        return this.chatRepo.find({ relations: ["userChat","messages"]});
    }


    async findOneChat(id: string){
        const chat = await this.chatRepo.findOne(id);
        if (!chat) {
            throw new NotFoundException(`Chat #(${id}) not found!`)
        }
        return chat;

    }

    getAllChatsByType(user: number, type: string){
 
    }


    async createChat(createChatDto: CreateChatDto, usersChat: UserChat[]){
        createChatDto.userChat = usersChat;
        return await this.customChatRepo.createChat(createChatDto);
    }

    async deleteChat(chatId: string,userChatId: number){
        const chat = await this.findOneChat(chatId);
        const userChat = chat.userChat[userChatId];
        console.log(userChat)
    }
}
