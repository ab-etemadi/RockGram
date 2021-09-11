/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ){}

    @Get('/:userId/:type')
    loadAllChats(@Param('userId') userId: number, @Param('type') type: string){
        return this.chatService.getAllChats(userId);
    }

    @Post('/:chatType')
    createGroup(@Body() groupChatDetail: CreateChatDto, @Param('chatType') chatType: string){
        return this.chatService.createGroupChat(groupChatDetail);
    }

    @Post()
    createChat(@Body() personalChatDetail: CreateChatDto,){
        return this.chatService.createPersonalChat(personalChatDetail);
    }

    @Delete(':chatId')
    deleteChat(@Param('chatId') chatId: number ){
        const userId =  this.getUserId();
        return this.chatService.deleteChat(userId,chatId );
    }

    getUserId() {
        return 1;
    }

}
