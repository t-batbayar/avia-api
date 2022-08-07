import { ApiProperty } from '@nestjs/swagger';

export class FindAllResearchQueryDto {
    @ApiProperty({ required: false })
    page: number;

    @ApiProperty({ required: false })
    perPage: number;

    @ApiProperty({ required: false })
    type: string;

    @ApiProperty({ required: false })
    title: string;
}
