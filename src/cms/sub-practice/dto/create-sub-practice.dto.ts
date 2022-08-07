import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSubPracticeDto {
    @ApiProperty()
    @IsString()
    ner: string;

    @ApiProperty()
    @IsString()
    argachlal: string;

    @ApiProperty()
    @IsString()
    zorilgo: string;

    @ApiProperty()
    @IsString()
    tailbar: string;

    @ApiProperty()
    @IsString()
    shuleg: string;
}
