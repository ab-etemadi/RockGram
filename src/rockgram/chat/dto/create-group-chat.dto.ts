/* eslint-disable prettier/prettier */

import { IsNumber, IsString } from "class-validator";
import { UserChat } from "src/rockgram/user_chat/user-chat";

export class CreateGroupChatDto{
  // @IsString()
  public name?: string;
  // @IsString()
  public type?: string;

  // @IsNumber()
  public membersId?: number[];

  public userChat: UserChat[];
}
