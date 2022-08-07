import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { News } from '../../cms/news/entities/news.entity';
import { RolesHierarchyModule } from '../roles-hierarchy/roles-hierarchy.module';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
    imports: [TypeOrmModule.forFeature([News]), RolesHierarchyModule],
    controllers: [NewsController],
    providers: [NewsService],
})
export class NewsModule {}
