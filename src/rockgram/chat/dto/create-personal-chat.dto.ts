/* eslint-disable prettier/prettier */

import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreatePersonalChatDto{
  @IsString()
  public memberEmail: string;

}
