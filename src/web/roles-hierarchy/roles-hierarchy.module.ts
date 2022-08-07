import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerRole } from '../customers/entities/customer-role.entity';
import { RolesHierarchyService } from './roles-hierarchy.service';

@Module({
    imports: [TypeOrmModule.forFeature([CustomerRole])],
    providers: [RolesHierarchyService],
    exports: [RolesHierarchyService],
})
export class RolesHierarchyModule {}
