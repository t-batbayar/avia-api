import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateDescriptionDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    body: string;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    order: number;
}
