import { Module } from '@nestjs/common';

import { PaymentStatus } from './entities/payment-status.entity';
import { PaymentStatusController } from './payment-status.controller';
import { PaymentStatusService } from './payment-status.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature([PaymentStatus])],
    controllers: [PaymentStatusController],
    providers: [PaymentStatusService],
})
export class PaymentStatusModule {}
