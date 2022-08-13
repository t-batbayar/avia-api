import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Practice } from '../../cms/practice/entities/practice.entity';
import { User } from '../../cms/users/entities/user.entity';
import { PracticeController } from './practice.controller';
import { PracticeService } from './practice.service';

@Module({
    imports: [TypeOrmModule.forFeature([Practice, User])],
    controllers: [PracticeController],
    providers: [PracticeService],
})
export class PracticeModule {}
