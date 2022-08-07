import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Practice } from '../practice/entities/practice.entity';
import { SubPractice } from './entities/sub-practice.entity';
import { SubPracticeController } from './sub-practice.controller';
import { SubPracticeService } from './sub-practice.service';

@Module({
    imports: [TypeOrmModule.forFeature([SubPractice, Practice])],
    controllers: [SubPracticeController],
    providers: [SubPracticeService],
})
export class SubPracticeModule {}
