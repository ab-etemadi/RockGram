/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChat } from './user-chat';

@Module({
    imports: [TypeOrmModule.forFeature([UserChat])],
    // exports:[UserChat]
}
)
export class UserChatModule {}