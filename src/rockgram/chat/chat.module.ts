/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { ChatRepository } from './repository/chatRepository';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRepository])],
  providers: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
