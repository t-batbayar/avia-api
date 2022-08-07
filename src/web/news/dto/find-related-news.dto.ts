import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FindRelatedNewsQueryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    maxItemSize = 4;
}
