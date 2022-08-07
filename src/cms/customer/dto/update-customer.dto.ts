import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class UpdateCustomerDto {
    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    role: number;
}
