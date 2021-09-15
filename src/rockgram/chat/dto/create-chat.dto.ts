/* eslint-disable prettier/prettier */

import { IsString } from "class-validator";

export class CreateChatDto{
  @IsString()
  readonly name: string;
  @IsString()
  // readonly type: chatType; 
  readonly type: string;
}

// export enum chatType{
//   personal = "PERSONAL",
//   group = "GROUP"
// }