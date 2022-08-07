import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class NewsSearchDto {
    @ApiProperty()
    @IsString()
    filter: string;

    @ApiProperty()
    @Type(() => Number)
    page: number;
}
