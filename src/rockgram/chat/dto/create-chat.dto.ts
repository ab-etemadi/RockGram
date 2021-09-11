/* eslint-disable prettier/prettier */

import { IsString } from "class-validator";

export class CreateChatDto{
  @IsString()
  readonly name: string;
  @IsString()
  readonly type: string; 
}
