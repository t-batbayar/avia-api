import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerRole } from '../../web/customers/entities/customer-role.entity';
import { ResearchType } from '../research-type/entities/research-type.entity';
import { Research } from './entities/research.entity';
import { ResearchController } from './research.controller';
import { ResearchService } from './research.service';

@Module({
    imports: [
        CacheModule.register(),
        TypeOrmModule.forFeature([Research, ResearchType, CustomerRole]),
    ],
    controllers: [ResearchController],
    providers: [ResearchService],
})
export class ResearchModule {}
