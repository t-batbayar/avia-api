import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

import { CmsUserRoles } from '../entities/cms-user.entity';

export class CreateCmsUserDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    confirmationPassword: string;

    // @ApiProperty()
    // @IsNotEmpty()
    // role: CmsUserRoles;
}
