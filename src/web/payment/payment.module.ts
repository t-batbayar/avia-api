import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../cms/users/entities/user.entity';
import { Payment } from './entities/payment.entity';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([Payment, User])],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule {}
