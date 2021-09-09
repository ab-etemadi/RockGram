/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/entities/chat.entity';
import { Message } from './message/entities/message.entity';
import { MessageModule } from './message/message.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
    imports: [ChatModule, UserModule, MessageModule,
         TypeOrmModule.forFeature([Message, Chat, User])],
}
)
export class CommonModule {}