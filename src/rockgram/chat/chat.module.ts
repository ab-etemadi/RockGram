/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserChat } from '../user_chat/user-chat';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import { ChatRepository } from './chatRepository';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRepository,Chat, UserChat,User])],
  providers: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
