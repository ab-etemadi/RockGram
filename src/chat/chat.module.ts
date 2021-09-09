/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { User } from './entities/user.entity';

@Module({
  controllers: [ChatController,],
  imports: [TypeOrmModule.forFeature([User, Message, Chat])],
  providers: [ChatService]
})
export class ChatModule {}
