/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ChatController, UserController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  controllers: [ChatController, UserController],
  providers: [ChatService]
})
export class ChatModule {}
