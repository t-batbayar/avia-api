import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from '../../mail/mail.module';
import { Customer } from '../../web/customers/entities/customer.entity';
import { CustomerRole } from '../../web/customers/entities/customer-role.entity';
import { Subscriptions } from '../../web/subscriptions/entity/subscriptions.entity';
import { NewsMailLog } from './entities/news-mail-log.entity';
import { MailServiceService } from './mail-service.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NewsMailLog,
            Customer,
            Subscriptions,
            CustomerRole,
        ]),
        MailModule,
    ],
    providers: [MailServiceService],
    exports: [MailServiceService],
})
export class MailServiceModule {}
