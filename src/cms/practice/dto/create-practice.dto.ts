import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePracticeDto {
    @ApiProperty()
    @IsString()
    useg: string;

    @ApiProperty()
    @IsString()
    ongo: string;

    @ApiProperty()
    @IsString()
    tailbar: string;

    @ApiProperty()
    @IsString()
    solijDuudah: string;

    @ApiProperty()
    @IsString()
    orhijDuudah: string;

    @ApiProperty()
    @IsString()
    beltgelUyeNeg: string;

    @ApiProperty()
    @IsString()
    beltgelUyeHoyor: string;

    @ApiProperty()
    @IsString()
    beltgelUyeGurav: string;
}
