import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

import { CMS_PERMISSION, CmsRoutes } from '../entities/cms-permission.entity';

export class UpdateCmsPermissionDto {
    @ApiProperty()
    @IsString()
    cmsRoles: CMS_PERMISSION;

    @ApiProperty()
    @IsArray()
    allowedRoles: CmsRoutes[];
}
