import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTermsDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    body: string;
}
