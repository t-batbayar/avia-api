import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SectorMainInfo } from '../../cms/graph-info/entities/sector-main-info.entity';
import { GraphInfoController } from './graph-info.controller';
import { GraphInfoService } from './graph-info.service';

@Module({
    imports: [TypeOrmModule.forFeature([SectorMainInfo])],
    controllers: [GraphInfoController],
    providers: [GraphInfoService],
})
export class GraphInfoModule {}
