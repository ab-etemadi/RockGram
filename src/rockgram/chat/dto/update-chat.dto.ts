/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";
import { UserChat } from "src/rockgram/user_chat/user-chat";

export class UpdateChatDto{
  @IsString()
  public name?: string;
}
