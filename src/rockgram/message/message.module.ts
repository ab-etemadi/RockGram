/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { CustomRepository } from './repository/custom-repo';

@Module({
<<<<<<< HEAD
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService, CustomRepository],
=======
  imports:[TypeOrmModule.forFeature([Message])],
  providers: [MessageService],
>>>>>>> 46f3d59b7eef163a6664f157e7e97140f2d6f785
  controllers: [MessageController],
})
export class MessageModule {}
