import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CmsPermissionController } from './cms-permission.controller';
import { CmsPermissionService } from './cms-permission.service';
import { CmsPermission } from './entities/cms-permission.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CmsPermission])],
    controllers: [CmsPermissionController],
    providers: [CmsPermissionService],
})
export class CmsPermissionModule {}
