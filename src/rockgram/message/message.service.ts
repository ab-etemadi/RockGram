/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Options } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../chat/chat.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './message.entity';
import { MessageRepository } from './message-repository';
import { Request } from 'express';
import { PaginationQueryDto } from '../common/paginationQuery.dto';

@Injectable()
export class MessageService {

  constructor(
    private readonly customRepository: MessageRepository,
   
  ){}
   getMessages(chatId: number, req: Request, paginationQuery: PaginationQueryDto) {
    return this.customRepository.getAllMessages(chatId, req, paginationQuery);
  }

  async searchMsg(req:Request, chatId: number, ){
    return await this.customRepository.searchMessage(req, chatId,);
  }


  async createMessage(message: CreateMessageDto, userId: number, chatId: number) {
    return await this.customRepository.createMesssage(message, userId, chatId)
  }

  async updateMessage(id: number, message: UpdateMessageDto, userId: number) {
   return this.customRepository.updateMessage(id, message, userId);
  }

  async deleteMessage(id: number, userId:number) {
    return this.customRepository.deleteMessage(id, userId);
  }

}
