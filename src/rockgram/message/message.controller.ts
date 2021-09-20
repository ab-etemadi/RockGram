/* eslint-disable prettier/prettier */


import { Controller, Get, Param, Post, Body, Patch, Delete, Req, Query, UseGuards } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';
import { Request } from 'express';
import { PaginationQueryDto } from '../common/paginationQuery.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('message')

export class MessageController {
    constructor(
        private readonly messageService: MessageService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get('/:chatId')
    findAllMessages(@Param('chatId') chatId: number, @Req() req:Request, @Query() paginationQuery: PaginationQueryDto){
       return this.messageService.getMessages(chatId,req,paginationQuery)

    }

    @UseGuards(JwtAuthGuard)
    @Get(":search/:chatId")
    searchMessage(@Req() req: Request, @Param("chatId") chatId: number,){
        if(chatId == this.getChatId()){
        return this.messageService.searchMsg(req, chatId);
         }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createMessage(@Body() message: CreateMessageDto){
        const userId = this.getUserId();
        const chatId = this.getChatId();
        return await this.messageService.createMessage(message,userId,chatId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateMessage(@Param('id') messageId: number, @Body() updatedMessage: UpdateMessageDto){
        return this.messageService.updateMessage(messageId, updatedMessage, this.getUserId());
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteMessage(@Param('id') id: number,){
        console.log(`${id} controller`);
        return this.messageService.deleteMessage(id, this.getUserId());
    }

    getUserId(){
        return 1;
    }

    getChatId(){
        return 2;
    }

  
}
