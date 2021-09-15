/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserChat } from "src/rockgram/user_chat/user-chat";
import { UserService } from '../user/user.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';
import { ChatRepository } from './repository/chat-repo';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>,
        @InjectRepository(UserChat)
        private readonly userChat: Repository<UserChat>,
        private readonly customChatRep: ChatRepository,
        // private readonly userService : UserService
    ){}

    getAllChats(){
        return this.chatRepository.find({ relations: ["userChat"]});
    }

    getAllChatsByType(user: number, type: string){
        if (type === 'personal') {
            return this.chatRepository.find()
            
        }
    }

    async createChat(createChatDto: CreateChatDto, userId: number[], msg: number[]){
        return await this.customChatRep.createChat(createChatDto, userId, msg)
    }

    

    deleteChat(userId: number, chatId: number){
        return `delete the chat with this ${chatId} chat id by this user id ${userId}`;
    }
}
