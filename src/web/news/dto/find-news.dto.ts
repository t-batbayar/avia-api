import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class FindNewsDto {
    @ApiProperty({ required: false })
    @IsOptional()
    type?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    page?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    perPage?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    isFeatured?: boolean;
}
