/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
    ){}

    @Get('/:chatId')
    findAllMessages(@Param('chatId') chatId: number){
       return this.chatService.getMessages(chatId);
    }

    @Post()
    createMessage(@Body() message: CreateMessageDto){
        const userID = this.getUserId();
        if(message.senderId != userID){
            throw new BadRequestException("sender id not matched");
        }
        return this.chatService.createMessage(message);
    }

    @Patch(':id')
    updateMessage(@Param('id') id: number, @Body() updatedMessage: UpdateMessageDto){
        return this.chatService.updateMessage(id, updatedMessage);
    } 

    @Delete(':id')
    deleteMessage(@Param('id') id: number){
        const userID = this.getUserId();
        return this.chatService.deleteMessage(id,userID);
    }

    getUserId(){
        // Asume this is reading from JWT
        return 1;
    }
}


