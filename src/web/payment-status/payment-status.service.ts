import { Injectable } from '@nestjs/common';

import { PaymentStatus } from '../../cms/payment-status/entities/payment-status.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class PaymentStatusService {
    constructor(
        @InjectRepository(PaymentStatus)
        private privacyRepo: EntityRepository<PaymentStatus>,
    ) {}

    async findOne() {
        const result = await this.privacyRepo.findOne({});
        return result;
    }
}
