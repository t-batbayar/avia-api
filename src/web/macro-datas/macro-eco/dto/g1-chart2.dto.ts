import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class G1Chart2Dto {
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
