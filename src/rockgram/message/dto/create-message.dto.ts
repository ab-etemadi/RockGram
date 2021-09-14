/* eslint-disable prettier/prettier */

import {IsString, IsNumber } from 'class-validator';


export class CreateMessageDto {
    @IsString()
    readonly text: string;
    @IsString()
    readonly date: string;
    @IsNumber()
    readonly userId: any;
    @IsNumber()
    readonly chatId: string;
}


