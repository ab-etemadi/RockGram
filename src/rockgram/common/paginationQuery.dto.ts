import { IsNumber, IsOptional, IsPositive } from "class-validator";
import { IsNull } from "typeorm";

export class PaginationQueryDto {
    @IsPositive()
    @IsOptional()
    @IsNumber()
    limit: number;

    @IsPositive()
    @IsOptional()
    @IsNumber()
    offset: number;
}