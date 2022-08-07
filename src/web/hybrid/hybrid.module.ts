import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HybridContact } from '../../cms/hybrid-contact/entities/hybrid-contact.entity';
import { HybridDescription } from '../../cms/hybrid-description/entities/hybrid-description.entity';
import { Research } from '../../cms/research/entities/research.entity';
import { ResearchType } from '../../cms/research-type/entities/research-type.entity';
import { RolesHierarchyModule } from '../roles-hierarchy/roles-hierarchy.module';
import { HybridController } from './hybrid.controller';
import { HybridService } from './hybrid.service';

@Module({
    imports: [
        CacheModule.register(),
        TypeOrmModule.forFeature([
            HybridDescription,
            HybridContact,
            Research,
            ResearchType,
        ]),
        RolesHierarchyModule,
    ],
    controllers: [HybridController],
    providers: [HybridService],
})
export class HybridModule {}
