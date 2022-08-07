import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaymentStatus } from '../../cms/payment-status/entities/payment-status.entity';

@Injectable()
export class PaymentStatusService {
    constructor(
        @InjectRepository(PaymentStatus)
        private privacyRepo: Repository<PaymentStatus>,
    ) {}

    async findOne() {
        const result = await this.privacyRepo.findOne({
            order: {
                id: 'DESC',
            },
        });
        return result;
    }
}
