import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSectorDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    horizontalName?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    verticalName?: string;
}
