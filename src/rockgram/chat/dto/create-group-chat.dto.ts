/* eslint-disable prettier/prettier */

import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { UserChat } from "src/rockgram/user_chat/user-chat";

export class CreateGroupChatDto{
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsArray()
  public membersEmail: string[];

  public userChat: UserChat[];
}
