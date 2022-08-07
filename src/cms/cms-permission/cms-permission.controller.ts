import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CmsRoles } from '../../common/decorators/cms-roles.decorator';
import { CmsRolesGuard } from '../../common/guards/cms-roles.guard';
import { CmsUserRoles } from '../cms-users/entities/cms-user.entity';
import { CmsPermissionService } from './cms-permission.service';
import { UpdateCmsPermissionDto } from './dto/update-cms-permission.dto';

@ApiTags('CMS Permission')
@Controller('cms-permission')
@CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
@UseGuards(CmsRolesGuard)
export class CmsPermissionController {
    constructor(private readonly cmsPermissionService: CmsPermissionService) {}

    @Get()
    findAll() {
        return this.cmsPermissionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cmsPermissionService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCmsPermissionDto: UpdateCmsPermissionDto,
    ) {
        return this.cmsPermissionService.update(+id, updateCmsPermissionDto);
    }
}
