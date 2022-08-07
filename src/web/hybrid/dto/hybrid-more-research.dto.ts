import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class HybridMoreResearchDto {
    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    researchIndex: number;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    page: number;
}
