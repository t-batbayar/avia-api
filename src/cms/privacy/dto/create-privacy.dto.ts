import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePrivacyDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    body: string;
}
