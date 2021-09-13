/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>,
    ){}

    getAllChats(user: number, type: string){
        return this.chatRepository.find();
    }

    createChat(personalChatDetail: CreateChatDto, id: number){
        return `create a personal chat with this ${personalChatDetail.name}`;
    }

    

    deleteChat(userId: number, chatId: number){
        return `delete the chat with this ${chatId} chat id by this user id ${userId}`;
    }
}
