/* eslint-disable prettier/prettier */


import { Controller, Get, Param, Post, Body, Patch, Delete, Req, Query, UseGuards,Request } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';
import { PaginationQueryDto } from '../common/paginationQuery.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CustomReq } from './customDecorator';

@Controller('message')

export class MessageController {
    constructor(
        private readonly messageService: MessageService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get('/:chatId')
    findAllMessages(@Param('chatId') chatId: number, @CustomReq() req, @Query() paginationQuery: PaginationQueryDto){
       return this.messageService.getMessages(chatId,req,paginationQuery)

    }

    @UseGuards(JwtAuthGuard)
    @Get(":search/:chatId")
    searchMessage(@CustomReq() req, @Param("chatId") chatId: number,){
        return this.messageService.searchMsg(req, chatId);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/:chatId")
    async createMessage(@Body() message: CreateMessageDto, @Param('chatId') chatId: number, @Request() req){
        
        return await this.messageService.createMessage(message,req.user.id,chatId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateMessage(@Param('id') messageId: number, @Body() updatedMessage: UpdateMessageDto, @Request() req){
        return this.messageService.updateMessage(messageId, updatedMessage, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteMessage(@Param('id') id: number,@Request() req){
        console.log(`${id} controller`);
        return this.messageService.deleteMessage(id, req.user.id);
    }


    getChatId(){
        return 2;
    }

  
}
