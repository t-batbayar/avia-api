import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class BomLoanDto {
    @ApiProperty()
    @IsNotEmpty()
    mainId: string;

    @ApiProperty()
    @IsNotEmpty()
    catId: string;

    @ApiProperty()
    @IsNotEmpty()
    level: string;
}
