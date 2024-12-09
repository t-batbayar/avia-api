import { Module } from '@nestjs/common';

import { Usage } from '../../cms/usage/entities/usage.entity';
import { UsageController } from './usage.controller';
import { UsageService } from './usage.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature([Usage])],
    controllers: [UsageController],
    providers: [UsageService],
})
export class UsageModule {}
