/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
    ){}

    @Get('/:chatId/:senderId')
    findAllMessages(@Param(':id') chatId: number, @Param(':id') senderId: number){
       return this.chatService.getMessages(chatId, senderId);
    }

    @Post()
    createMessage(@Body() message: CreateMessageDto){
        return this.chatService.createMessage(message);
    }

    @Patch()
    updateMessage(@Param(':id') id: number, @Body() updatedMessage: UpdateMessageDto){
        return this.chatService.updateMessage(id, updatedMessage);
    } 

    @Delete(':id')
    deleteMessage(@Param(':id') id: number){
        return this.chatService.deleteMessage(id);
    }

}


