/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserChat } from "src/rockgram/user_chat/user-chat";
import { UserService } from '../user/user.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';

import { ChatRepository } from './repository/chatRepository';

@Injectable()
export class ChatService {
    constructor(private chatRepo : ChatRepository
    ){}

    getAllChats(){
        // return this.chatRepo.find({ relations: ["userChat"]});
    }

    getAllChatsByType(user: number, type: string){
        // if (type === 'personal') {
        //     return this.chatRepository.find()
            
        // }
    }


    async createChat(createChatDto: CreateChatDto){
        return await this.chatRepo.createChat(createChatDto, [{id:undefined,userId:1,chatId:1 , role:"admin"}] )
    }

    

    deleteChat(userId: number, chatId: number){
        return `delete the chat with this ${chatId} chat id by this user id ${userId}`;
    }
}
