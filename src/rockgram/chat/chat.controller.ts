/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import {  CreateGroupChatDto } from './dto/create-group-chat.dto';
import { AddDeleteChatMemberDto } from './dto/add-delete-chat-member.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreatePersonalChatDto } from './dto/create-personal-chat.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService,

    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllChats(){
        return this.chatService.getAllChats();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':type')
    getAllChatsByType(@Param('type') type: string, @Request() req){
        const userId = req.user.id;
        return this.chatService.getAllChatsByType(userId,type);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':personal')
    createPersonalChat(@Body() createPersonalChatDto: CreatePersonalChatDto, @Request() req){
        const userId = req.user.id;
        console.log(userId)
        return this.chatService.createPersonalChat(createPersonalChatDto, userId);
    }

    @UseGuards(JwtAuthGuard)
    // @Post(':group')
    @Post()
    createGroupChat(@Body() createGroupChatDto: CreateGroupChatDto, @Request() req){
        const userId = req.user.id;
        return this.chatService.createGroupChat(createGroupChatDto, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":chatId")
    updateGroup(@Body() chatDetail: UpdateChatDto, @Param('chatId') chatId: number){
        return this.chatService.updateGroupChat(chatDetail, chatId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':chatId')
    deleteChat(@Param('chatId') chatId: number, @Request() req){
        const userId = req.user.id;
        return this.chatService.deleteChat(chatId, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('group/:chatId')
    deleteGroupMember(@Param('chatId') chatId: number, @Body() chatMember: AddDeleteChatMemberDto){
        return this.chatService.deleteChat(chatId, chatMember.memberId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('group/:chatId')
    addGroupMember(@Param('chatId') chatId: number, @Body() chatMember: AddDeleteChatMemberDto){
        return this.chatService.addGroupMember(chatId, chatMember.memberId);
    }


}
