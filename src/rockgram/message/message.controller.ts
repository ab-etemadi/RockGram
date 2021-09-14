/* eslint-disable prettier/prettier */

import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

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
    createMessage(@Body() message: CreateMessageDto){
        return this.messageService.createMessage(message);
    }

    @Patch(':id')
    updateMessage(@Param('id') id: number, @Body() updatedMessage: UpdateMessageDto){
        return this.messageService.updateMessage(id, updatedMessage);
    } 

    @Delete(':id')
    deleteMessage(@Param('id') id: number){
        const userId = this.getUserId();
        return this.messageService.deleteMessage(id,userId);
    }

    getUserId(){
        return 2;
    }

    getChatId(){
        return 1;
    }
}
