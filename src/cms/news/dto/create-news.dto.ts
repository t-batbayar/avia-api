import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    IsBoolean,
    IsDate,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateNewsDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    body: string;

    @ApiProperty()
    @IsBoolean()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    isFeatured: boolean;

    @ApiProperty()
    @IsString()
    type: string;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    publishAt: Date;

    @ApiProperty()
    @IsOptional()
    @Transform(({ value }) => (value ? new Date(value) : null))
    expireAt?: Date;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    customerRole: number;
}
