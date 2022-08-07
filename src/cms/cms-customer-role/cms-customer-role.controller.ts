import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CmsRoles } from '../../common/decorators/cms-roles.decorator';
import { CmsRolesGuard } from '../../common/guards/cms-roles.guard';
import { CmsUserRoles } from '../cms-users/entities/cms-user.entity';
import { CmsCustomerRoleService } from './cms-customer-role.service';

@ApiTags('CMS Customer Role')
@Controller('customer-role')
@CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
@UseGuards(CmsRolesGuard)
export class CmsCustomerRoleController {
    constructor(
        private readonly cmsCustomerRoleService: CmsCustomerRoleService,
    ) {}

    @Get()
    async getRoles() {
        return this.cmsCustomerRoleService.getAll();
    }
}
