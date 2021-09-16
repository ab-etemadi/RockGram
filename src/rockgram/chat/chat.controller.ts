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
        console.log(type);
        const user = this.getUserId();
        return this.chatService.getAllChatsByType(user,type);
    }

    @Post()
    createChat(@Query('memberId') memberId: number, @Body() ChatDetail: CreateChatDto){
        console.log(memberId);
        const usersChat = this.getUsersChat(memberId);
        return this.chatService.createChat(ChatDetail,usersChat);
    }

    @Delete(':chatId')
    deleteChat(@Param('chatId') chatId: string ){
        const userChat = this.getUserId();
        return this.chatService.deleteChat(chatId, userChat);
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
