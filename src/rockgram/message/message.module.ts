/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { CustomRepository } from './repository/custom-repo';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService, CustomRepository],
  controllers: [MessageController],
})
export class MessageModule {}
