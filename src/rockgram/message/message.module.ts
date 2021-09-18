/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageRepository } from './message-repository';
@Module({
  imports:[TypeOrmModule.forFeature([MessageRepository, Message])],
  providers: [MessageService,],
  controllers: [MessageController],
})
export class MessageModule {}
