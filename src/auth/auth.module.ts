import { Module } from "@nestjs/common";
import { APP_GUARD, Reflector } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/rockgram/user/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [TypeOrmModule.forFeature([User]), JwtModule.register({secret: 'SECRET',})],
    providers: [AuthService, JwtStrategy,],
    controllers: [AuthController],
    exports: [AuthModule]
  })
  export class AuthModule {}
  