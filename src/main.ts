/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as passport from 'passport';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
  .setTitle('RockGram')
  .setDescription('Chat Application')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api', app,document);
  await app.listen(3000);
}
bootstrap();
