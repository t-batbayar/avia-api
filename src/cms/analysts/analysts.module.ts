import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnalystsController } from './analysts.controller';
import { AnalystsService } from './analysts.service';
import { Analyst } from './entities/analyst.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Analyst])],
    controllers: [AnalystsController],
    providers: [AnalystsService],
})
export class AnalystsModule {}
