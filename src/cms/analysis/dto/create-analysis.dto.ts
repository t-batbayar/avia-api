import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    IsBoolean,
    IsDate,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateAnalysisDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    highlightContent: string;

    @ApiProperty()
    @IsBoolean()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    isFeatured: boolean;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    customerRole: number;

    @ApiProperty()
    @IsString()
    analysts: string;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    publishAt: Date;

    @ApiProperty()
    @IsOptional()
    @Transform(({ value }) => (value ? new Date(value) : value))
    expireAt: Date;
}
