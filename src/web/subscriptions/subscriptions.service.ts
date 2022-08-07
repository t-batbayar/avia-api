import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Subscriptions } from './entity/subscriptions.entity';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectRepository(Subscriptions)
        private subscriptionRepo: Repository<Subscriptions>,
    ) {}

    async addSubscription(email: string) {
        const subscribedEmail = await this.subscriptionRepo.findOne({
            where: {
                email,
            },
        });

        if (subscribedEmail) {
            return subscribedEmail;
        }

        const newSubscription = new Subscriptions();
        newSubscription.email = email;

        return await this.subscriptionRepo.save(newSubscription);
    }
}
