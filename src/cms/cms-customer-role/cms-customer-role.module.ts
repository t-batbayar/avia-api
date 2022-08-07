import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerRole } from '../../web/customers/entities/customer-role.entity';
import { CmsCustomerRoleController } from './cms-customer-role.controller';
import { CmsCustomerRoleService } from './cms-customer-role.service';

@Module({
    imports: [TypeOrmModule.forFeature([CustomerRole])],
    providers: [CmsCustomerRoleService],
    controllers: [CmsCustomerRoleController],
})
export class CmsCustomerRoleModule {}
