import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class ImpExpTreeMapDto {
    @ApiProperty()
    @IsNotEmpty()
    mainId: string;

    @ApiProperty()
    @IsNotEmpty()
    catId: string;

    @ApiProperty()
    @IsNotEmpty()
    level: string;

    @ApiProperty()
    @IsNotEmpty()
    year: string;
}
