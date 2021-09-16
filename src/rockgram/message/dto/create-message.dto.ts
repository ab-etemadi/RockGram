/* eslint-disable prettier/prettier */

import {IsString, IsDateString, IsDate, IsISO8601 } from 'class-validator';


export class CreateMessageDto {
    @IsString()
    readonly text: string;


    
    // @IsDate()
    public date?: Date;

}


