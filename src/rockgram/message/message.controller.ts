/* eslint-disable prettier/prettier */


import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';

@Controller('message')

export class MessageController {
    constructor(
        private readonly messageService: MessageService
    ){}

    @Get('/:chatId')
    findAllMessages(@Param('chatId') chatId: number){
       return this.messageService.getMessages(chatId)

    }

    @Post()
    async createMessage(@Body() message: CreateMessageDto){
        const userId = this.getUserId();
        const chatId = this.getChatId();
        return await this.messageService.createMessage(message,userId,chatId);
    }

    @Patch(':id')
    updateMessage(@Param('id') messageId: number, @Body() updatedMessage: UpdateMessageDto){
        return this.messageService.updateMessage(messageId, updatedMessage, this.getUserId());
    }

    @Delete(':id')
    deleteMessage(@Param('id') id: number,){
        console.log(`${id} controller`);
        return this.messageService.deleteMessage(id, this.getUserId());
    }

    getUserId(){
        return 2;
    }

    getChatId(){
        return 17;
    }

  
}
