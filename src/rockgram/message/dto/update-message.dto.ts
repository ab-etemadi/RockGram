/* eslint-disable prettier/prettier */
import {IsString } from 'class-validator';

export class UpdateMessageDto{
  @IsString()
  readonly textOne: string;
}