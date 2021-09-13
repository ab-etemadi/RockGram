/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
    getAllChats(userId: number){
        return `returns all chats with this userId: ${userId}`;
    }

    createPersonalChat(personalChatDetail: CreateChatDto, id: number){
        return `create a personal chat with this ${personalChatDetail.name}`;
    }

    createGroupChat(groupChatDetail: CreateChatDto){
        return `create a group chat with this ${groupChatDetail.name}`;
    }

    deleteChat(userId: number, chatId: number){
        return `delete the chat with this ${chatId} chat id by this user id ${userId}`;
    }
}
