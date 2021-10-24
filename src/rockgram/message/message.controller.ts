/* eslint-disable prettier/prettier */


import { Controller, Get, Param, Post, Body, Patch, Delete, Req, Query, UseGuards,Request } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';
import { PaginationQueryDto } from '../common/paginationQuery.dto';
import { CustomReq } from './customDecorator';
import { Public } from '../common/decorators/public.decorators';
import { GetCurrentUserById } from '../common/decorators/get-user-by-id-decorator';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('message')

export class MessageController {
    constructor(
        private readonly messageService: MessageService
    ){}

    @UseGuards(JwtGuard)
    @Get('/:chatId')
    findAllMessages(@Param('chatId') chatId: number, @CustomReq() req, @Query() paginationQuery: PaginationQueryDto){
       return this.messageService.getMessages(chatId,req,paginationQuery)

    }
    @UseGuards(JwtGuard) 
    @Get(":search/:chatId")
    searchMessage(@CustomReq() req, @Param("chatId") chatId: number,){
        return this.messageService.searchMsg(req, chatId);
    }
    @UseGuards(JwtGuard)
    @Post("/:chatId")
    async createMessage(@Body() message: CreateMessageDto, @Param('chatId') chatId: number,@GetCurrentUserById() user: any ){
        return await this.messageService.createMessage(message,user.id,chatId);

    }
    @UseGuards(JwtGuard)
    @Patch(':id')
    updateMessage(@Param('id') messageId: number, @Body() updatedMessage: UpdateMessageDto, @Request() req){
        return this.messageService.updateMessage(messageId, updatedMessage, req.user.id);
    }
    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteMessage(@Param('id') id: number,@Request() req){
        console.log(`${id} controller`);
        return this.messageService.deleteMessage(id, req.user.id);
    }


  
}
