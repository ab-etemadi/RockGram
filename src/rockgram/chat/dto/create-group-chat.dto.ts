/* eslint-disable prettier/prettier */

import { IsArray, IsNumber, IsString } from "class-validator";
import { UserChat } from "src/rockgram/user_chat/user-chat";

export class CreateGroupChatDto{
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsArray()
  public membersId: number[];

  public userChat: UserChat[];
}
