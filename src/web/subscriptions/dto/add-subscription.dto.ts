import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AddSubscriptionDto {
    @ApiProperty()
    @IsEmail()
    email: string;
}
