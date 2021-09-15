/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { UserChat } from "src/rockgram/user_chat/user-chat";
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { UserChatModule } from '../user_chat/user_chat.module';
import { ChatRepository } from './repository/chat-repo';
@Module({
  imports: [TypeOrmModule.forFeature([Chat,UserChat]),UserChatModule],
  providers: [ChatService, ChatRepository],
  controllers: [ChatController],
})
export class ChatModule {}
