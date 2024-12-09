import { Module } from '@nestjs/common';

import { PaymentStatus } from '../../cms/payment-status/entities/payment-status.entity';
import { Practice } from '../../cms/practice/entities/practice.entity';
import { User } from '../../cms/users/entities/user.entity';
import { PracticeController } from './practice.controller';
import { PracticeService } from './practice.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature([Practice, User, PaymentStatus])],
    controllers: [PracticeController],
    providers: [PracticeService],
})
export class PracticeModule {}
