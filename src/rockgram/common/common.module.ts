/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from '../chat/chat.module';
import { Chat } from '../chat/chat.entity';
import { Message } from '../message/message.entity';
import { MessageModule } from '../message/message.module';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { UserChat } from '../user_chat/user-chat';
import { UserChatModule } from '../user_chat/user_chat.module';
import { AuthModuleOptions } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/jwt.guard';

@Module({
    imports: [
        ChatModule,
        UserModule, 
        MessageModule,
        UserChatModule,
        AuthModule
    ],
}
)
export class CommonModule {}