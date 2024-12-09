import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { User } from '../../cms/users/entities/user.entity';
import { Payment } from './entities/payment.entity';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [HttpModule, MikroOrmModule.forFeature([Payment, User])],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule {}
