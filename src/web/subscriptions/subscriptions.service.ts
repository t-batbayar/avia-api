import { Injectable } from '@nestjs/common';

import { Subscriptions } from './entity/subscriptions.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectRepository(Subscriptions)
        private subscriptionRepo: EntityRepository<Subscriptions>,
    ) {}

    async addSubscription(email: string) {
        const subscribedEmail = await this.subscriptionRepo.findOne({
            email,
        });

        if (subscribedEmail) {
            return subscribedEmail;
        }

        const newSubscription = new Subscriptions();
        newSubscription.email = email;

        return await this.subscriptionRepo.insert(newSubscription);
    }
}
