/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from '../chat/chat.module';
import { Chat } from '../chat/entities/chat.entity';
import { Message } from '../message/entities/message.entity';
import { MessageModule } from '../message/message.module';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { UserChat } from '../user_chat/user-chat';
import { UserChatModule } from '../user_chat/user_chat.module';

@Module({
    imports: [
        ChatModule,
        UserModule, 
        MessageModule,
        UserChatModule
    ]
}
)
export class CommonModule {}