import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Research } from '../research/entities/research.entity';
import { ResearchType } from './entities/research-type.entity';
import { ResearchTypeController } from './research-type.controller';
import { ResearchTypeService } from './research-type.service';

@Module({
    imports: [TypeOrmModule.forFeature([ResearchType, Research])],
    controllers: [ResearchTypeController],
    providers: [ResearchTypeService],
})
export class ResearchTypeModule {}
