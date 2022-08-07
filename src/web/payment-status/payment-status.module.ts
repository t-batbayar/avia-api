import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentStatus } from '../../cms/payment-status/entities/payment-status.entity';
import { PaymentStatusController } from './payment-status.controller';
import { PaymentStatusService } from './payment-status.service';

@Module({
    imports: [TypeOrmModule.forFeature([PaymentStatus])],
    controllers: [PaymentStatusController],
    providers: [PaymentStatusService],
})
export class PaymentStatusModule {}
