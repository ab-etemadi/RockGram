/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class UpdateUserDto{
    @IsString()
    readonly fullname: string;

    @IsString()
    readonly password: string;
}