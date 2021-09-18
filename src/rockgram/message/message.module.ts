/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageRepository } from './repository/message-repository';
@Module({
  imports:[TypeOrmModule.forFeature([MessageRepository, Message])],
  providers: [MessageService,],
  controllers: [MessageController],
})
export class MessageModule {}
