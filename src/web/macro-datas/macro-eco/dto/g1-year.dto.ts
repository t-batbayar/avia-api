import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class G1YearDto {
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
