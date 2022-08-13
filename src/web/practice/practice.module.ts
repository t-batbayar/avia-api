import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentStatus } from '../../cms/payment-status/entities/payment-status.entity';
import { Practice } from '../../cms/practice/entities/practice.entity';
import { User } from '../../cms/users/entities/user.entity';
import { PracticeController } from './practice.controller';
import { PracticeService } from './practice.service';

@Module({
    imports: [TypeOrmModule.forFeature([Practice, User, PaymentStatus])],
    controllers: [PracticeController],
    providers: [PracticeService],
})
export class PracticeModule {}
