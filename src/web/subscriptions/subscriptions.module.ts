import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Subscriptions } from './entity/subscriptions.entity';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';

@Module({
    imports: [TypeOrmModule.forFeature([Subscriptions])],
    controllers: [SubscriptionsController],
    providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
