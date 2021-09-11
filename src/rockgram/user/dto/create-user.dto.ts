import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly fullname: string;

    @IsString()
    readonly email: string;

    @IsString()
    readonly password: string;

}
