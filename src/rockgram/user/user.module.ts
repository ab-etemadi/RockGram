import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([User]), JwtModule.register({secret: 'SECRET',})],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
