/* eslint-disable prettier/prettier */

import { IsNumber, IsString } from "class-validator";
import { UserChat } from "src/rockgram/user_chat/user-chat";

export class CreateChatDto{
  @IsString()
  readonly name: string;
  @IsString()
  // readonly type: chatType; 
  readonly type: string;

  public userChat: UserChat[];
}

// export enum chatType{
//   personal = "PERSONAL",
//   group = "GROUP"
// }