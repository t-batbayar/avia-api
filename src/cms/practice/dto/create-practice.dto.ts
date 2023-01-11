import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
    @IsOptional()
    beltgelUyeHoyor: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    beltgelUyeGurav: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    hevshuulehShatNeg: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    hevshuulehShatHoyor: string;
}
