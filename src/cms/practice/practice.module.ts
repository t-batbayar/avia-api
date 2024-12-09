import { Module } from '@nestjs/common';

import { Practice } from './entities/practice.entity';
import { PracticeController } from './practice.controller';
import { PracticeService } from './practice.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature([Practice])],
    controllers: [PracticeController],
    providers: [PracticeService],
})
export class PracticeModule {}
