/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { chatType, CreateChatDto } from './dto/create-chat.dto';
@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ){}

    @Get(':type')
    loadAllChats(@Query('type') type: chatType = chatType.personal){
        const user = this.getUserId();
        return this.chatService.getAllChats(user,type);
    }

    @Post()
    createChat(@Body() personalChatDetail: CreateChatDto){
        const userId =  this.getUserId();
        return this.chatService.createChat(personalChatDetail, userId);
    }

    @Delete(':chatId')
    deleteChat(@Param('chatId') chatId: number ){
        const userId =  this.getUserId();
        return this.chatService.deleteChat(userId,chatId );
    }

    getUserId() {
        return 2;
    }

}
