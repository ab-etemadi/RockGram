/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Options } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../chat/entities/chat.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { CustomRepository } from './repository/custom-repo';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly customRepository: CustomRepository,
   
  ){}
  getMessages(chatId: number) {
    return this.messageRepository.findOne(chatId);
  }


  async createMessage(message: CreateMessageDto, userId: number, chatId: number) {
    return await this.customRepository.createMesssage(message, userId, chatId)
  }

  async updateMessage(id: number, message: UpdateMessageDto) {
    const msg = await this.messageRepository.preload({
      id: id,
      ...message
    })
    if(!message){
      throw new NotFoundException('message not found with this id number');
    }
    return this.messageRepository.save(msg);
  }

  async deleteMessage(id: number, userId:number) {
    const msg = await this.messageRepository.findOne(id);
    return this.messageRepository.delete(msg);
  }

}
