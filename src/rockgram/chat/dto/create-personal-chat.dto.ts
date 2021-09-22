/* eslint-disable prettier/prettier */

import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreatePersonalChatDto{
  @IsNumber()
  public memberId: number;

}
