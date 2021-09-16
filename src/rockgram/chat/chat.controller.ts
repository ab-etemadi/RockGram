/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import {  CreateChatDto } from './dto/create-chat.dto';
@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ){}

    
    @Get()
    getAllChats(){
        return this.chatService.getAllChats();
    }

    @Get(':type')
    getAllChatsByType(@Param('type') type: string){
        const user = this.getUserId();
        return this.chatService.getAllChatsByType(user,type);
    }

    // @Post(':personal')
    @Post()
    createChat(@Query('memberId') memberId: number, @Body() ChatDetail: CreateChatDto){
        const usersChat = this.getUsersChat(memberId);
        return this.chatService.createChat(ChatDetail,usersChat);
    }

    @Delete(':chatId')
    deleteChat(@Param('chatId') chatId: number ){
        const user = this.getUserId();
        return this.chatService.deleteChat(chatId, user);
    }

    getUsersChat(memberId) {
        return [
            {userId: this.getUserId, role:"admin"},
            {userId:memberId, role:"member"},
        ]
    }
    getUserId(){
        return 1;
    }
   

}
