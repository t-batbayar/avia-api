import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateResearchDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    researchType: number;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    customerRole: number;

    @ApiProperty()
    @IsOptional()
    fileJpg: Express.Multer.File;

    @ApiProperty()
    @IsOptional()
    fileMp3: Express.Multer.File;

    @ApiProperty()
    @IsOptional()
    filePdf: Express.Multer.File;

    @ApiProperty()
    @IsOptional()
    filePpt: Express.Multer.File;

    @ApiProperty()
    @IsOptional()
    fileWord: Express.Multer.File;

    @ApiProperty()
    @IsOptional()
    fileXlsx: Express.Multer.File;

    @ApiProperty()
    @IsOptional()
    @Type(() => Date)
    publishAt: Date;

    @ApiProperty()
    @IsOptional()
    @Transform(({ value }) => (value ? new Date(value) : null))
    expireAt: Date | null;
}
