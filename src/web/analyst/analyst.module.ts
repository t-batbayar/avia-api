import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Analyst } from '../../cms/analysts/entities/analyst.entity';
import { AnalystController } from './analyst.controller';
import { AnalystService } from './analyst.service';

@Module({
    imports: [TypeOrmModule.forFeature([Analyst])],
    controllers: [AnalystController],
    providers: [AnalystService],
})
export class AnalystModule {}
