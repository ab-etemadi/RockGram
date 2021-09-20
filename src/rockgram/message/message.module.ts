/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageRepository } from './message-repository';
import { UserChat } from '../user_chat/user-chat';
@Module({
  imports:[TypeOrmModule.forFeature([MessageRepository, Message, UserChat])],
  providers: [MessageService,],
  controllers: [MessageController],
})
export class MessageModule {}
