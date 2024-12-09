import { Module } from '@nestjs/common';

import { Subscriptions } from './entity/subscriptions.entity';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature([Subscriptions])],
    controllers: [SubscriptionsController],
    providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
