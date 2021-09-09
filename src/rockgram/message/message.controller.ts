/* eslint-disable prettier/prettier */
<<<<<<< HEAD:src/rockgram/message/message.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
=======
import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
>>>>>>> origin/master:src/chat/chat.controller.ts
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';

@Controller('message')
<<<<<<< HEAD:src/rockgram/message/message.controller.ts
export class MessageController {
=======
export class ChatController {
>>>>>>> origin/master:src/chat/chat.controller.ts
    constructor(
        private readonly messageService: MessageService
    ){}

<<<<<<< HEAD:src/rockgram/message/message.controller.ts
    @Get('/:chatId/:senderId')
    findAllMessages(@Param(':id') chatId: number, @Param(':id') senderId: number){
       return this.messageService.getMessages(chatId,senderId )
=======
    @Get('/:chatId')
    findAllMessages(@Param('chatId') chatId: number){
       return this.chatService.getMessages(chatId);
>>>>>>> origin/master:src/chat/chat.controller.ts
    }

    @Post()
    createMessage(@Body() message: CreateMessageDto){
<<<<<<< HEAD:src/rockgram/message/message.controller.ts
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
=======
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
>>>>>>> origin/master:src/chat/chat.controller.ts
}
