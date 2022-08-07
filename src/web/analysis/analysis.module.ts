import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Analysis } from '../../cms/analysis/entities/analysis.entity';
import { RolesHierarchyModule } from '../roles-hierarchy/roles-hierarchy.module';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';

@Module({
    imports: [TypeOrmModule.forFeature([Analysis]), RolesHierarchyModule],
    controllers: [AnalysisController],
    providers: [AnalysisService],
})
export class AnalysisModule {}
