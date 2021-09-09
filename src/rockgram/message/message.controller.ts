/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService
    ){}

    @Get('/:chatId/:senderId')
    findAllMessages(@Param(':id') chatId: number, @Param(':id') senderId: number){
       return this.messageService.getMessages(chatId,senderId )
    }

    @Post()
    createMessage(@Body() message: CreateMessageDto){
        return this.messageService.createMessage(message);
    }

    @Patch()
    updateMessage(@Param(':id') id: number, @Body() updatedMessage: UpdateMessageDto){
        return this.messageService.updateMessage(id, updatedMessage);
    } 

    @Delete(':id')
    deleteMessage(@Param(':id') id: number){
        return this.messageService.deleteMessage(id);
    }
}
