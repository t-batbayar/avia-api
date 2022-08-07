import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Subscriptions } from '../../web/subscriptions/entity/subscriptions.entity';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectRepository(Subscriptions)
        private subscriptionsRepo: Repository<Subscriptions>,
    ) {}

    async getSubscriptions() {
        return this.subscriptionsRepo.find({
            order: {
                createdAt: 'DESC',
            },
        });
    }
}
