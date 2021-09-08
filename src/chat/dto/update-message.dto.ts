/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';

export class UpdateMessageDto{
  @IsString()
  readonly text: string;
}