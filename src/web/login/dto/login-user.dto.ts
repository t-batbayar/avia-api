import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LoginUserDto {
    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    deviceId: string;

    @ApiProperty()
    @IsString()
    loginType: string;
}
