/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import {  CreateGroupChatDto } from './dto/create-group-chat.dto';
import { AddDeleteChatMemberDto } from './dto/add-delete-chat-member.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreatePersonalChatDto } from './dto/create-personal-chat.dto';
import { PaginationQueryDto } from '../common/paginationQuery.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserById } from '../common/decorators/get-user-by-id-decorator';
import { Public } from '../common/decorators/public.decorators';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService,

    ){}

    @UseGuards(JwtGuard)
    @Get()
    getAllChats(){
        return this.chatService.getAllChats();
    }
    // @Public()
    @UseGuards(JwtGuard)
    @Get(':type')
    getAllChatsByType(@Param('type') type: string, @GetCurrentUserById() user: any, @Query() paginationQuery: PaginationQueryDto){
       console.log(user);
        return this.chatService.getAllChatsByType(user.id,type, paginationQuery);
    }

    @UseGuards(JwtGuard)
    @Post(':personal')
    createPersonalChat(@Body() createPersonalChatDto: CreatePersonalChatDto, @Request() req){
        const userId = req.user.id;
        console.log(userId)
        return this.chatService.createPersonalChat(createPersonalChatDto, userId);
    }

    @UseGuards(JwtGuard)
    @Post()
    createGroupChat(@Body() createGroupChatDto: CreateGroupChatDto, @Request() req){
        const userId = req.user.id;
        return this.chatService.createGroupChat(createGroupChatDto, userId);
    }

    @UseGuards(JwtGuard)
    @Patch(":chatId")
    updateGroup(@Body() chatDetail: UpdateChatDto, @Param('chatId') chatId: number){
        return this.chatService.updateGroupChat(chatDetail, chatId);
    }

    @UseGuards(JwtGuard)
    @Delete(':chatId')
    deleteChat(@Param('chatId') chatId: number, @Request() req){
        const userId = req.user.id;
        return this.chatService.deleteChat(chatId, userId);
    }

    @UseGuards(JwtGuard)    
    @Delete('group/:chatId')
    deleteGroupMember(@Param('chatId') chatId: number, @Body() chatMember: AddDeleteChatMemberDto){
        return this.chatService.deleteChat(chatId, chatMember.memberId);
    }

    @UseGuards(JwtGuard)
    @Patch('group/:chatId')
    addGroupMember(@Param('chatId') chatId: number, @Body() chatMember: AddDeleteChatMemberDto){
        return this.chatService.addGroupMember(chatId, chatMember.memberId);
    }


}
