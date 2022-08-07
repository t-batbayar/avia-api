import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerRole } from '../../web/customers/entities/customer-role.entity';
import { Analyst } from '../analysts/entities/analyst.entity';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { Analysis } from './entities/analysis.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Analysis, CustomerRole, Analyst])],
    controllers: [AnalysisController],
    providers: [AnalysisService],
})
export class AnalysisModule {}
