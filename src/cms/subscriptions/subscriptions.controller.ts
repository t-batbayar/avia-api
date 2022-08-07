import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CmsRoles } from '../../common/decorators/cms-roles.decorator';
import { CmsRolesGuard } from '../../common/guards/cms-roles.guard';
import { CmsUserRoles } from '../cms-users/entities/cms-user.entity';
import { SubscriptionsService } from './subscriptions.service';

@ApiTags('CMS Subscriptions')
@Controller('subscriptions')
@CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
@UseGuards(CmsRolesGuard)
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) {}

    @Get()
    getSubscriptions() {
        return this.subscriptionsService.getSubscriptions();
    }
}
