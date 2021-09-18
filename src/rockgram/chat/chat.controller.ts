/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import {  CreateGroupChatDto } from './dto/create-group-chat.dto';
import { AddDeleteChatMemberDto } from './dto/add-delete-chat-member.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreatePersonalChatDto } from './dto/create-personal-chat.dto';
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

    @Post(':personal')
    createPersonalChat(@Body() createPersonalChatDto: CreatePersonalChatDto){
        const userId = this.getUserId();
        return this.chatService.createPersonalChat(createPersonalChatDto, userId);
    }

    // @Post(':group')
    @Post()
    createGroupChat(@Body() createGroupChatDto: CreateGroupChatDto){
        const userId = this.getUserId();
        return this.chatService.createGroupChat(createGroupChatDto, userId);
    }

    @Patch(":chatId")
    updateGroup(@Body() chatDetail: UpdateChatDto, @Param('chatId') chatId: number){
        return this.chatService.updateGroupChat(chatDetail, chatId);
    }


    @Delete(':chatId')
    deleteChat(@Param('chatId') chatId: number){
        const user = this.getUserId();
        return this.chatService.deleteChat(chatId, user);
    }

    @Delete('group/:chatId')
    deleteGroupMember(@Param('chatId') chatId: number, @Body() chatMember: AddDeleteChatMemberDto){
        return this.chatService.deleteChat(chatId, chatMember.memberId);
    }

    @Patch('group/:chatId')
    addGroupMember(@Param('chatId') chatId: number, @Body() chatMember: AddDeleteChatMemberDto){
        return this.chatService.addGroupMember(chatId, chatMember.memberId);
    }

    getUserId(){
        return 1;
    }
   

}
