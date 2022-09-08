import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../cms/users/entities/user.entity';
import { AuthMiddleware } from '../common/middleware/auth.middleware';
import { DescriptionModule } from './description/description.module';
import { LoginModule } from './login/login.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentStatusModule } from './payment-status/payment-status.module';
import { PracticeModule } from './practice/practice.module';
import { PrivacyModule } from './privacy/privacy.module';
import { TermsModule } from './terms/terms.module';
import { UsageModule } from './usage/usage.module';

@Module({
    imports: [
        DescriptionModule,
        PracticeModule,
        PrivacyModule,
        TermsModule,
        UsageModule,
        LoginModule,
        PaymentStatusModule,
        PaymentModule,
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [],
    providers: [],
})
export class WebModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        const prefix = 'api';
        consumer
            .apply(AuthMiddleware)
            .exclude(
                {
                    path: `${prefix}/admin(.*)`,
                    method: RequestMethod.ALL,
                },
                {
                    path: `${prefix}/privacy`,
                    method: RequestMethod.GET,
                },
                {
                    path: `${prefix}/terms`,
                    method: RequestMethod.GET,
                },
                {
                    path: `${prefix}/usage`,
                    method: RequestMethod.GET,
                },
                {
                    path: `${prefix}/login`,
                    method: RequestMethod.POST,
                },
                {
                    path: `${prefix}/webhook(.*)`,
                    method: RequestMethod.GET,
                },
            )
            .forRoutes('*');
    }
}
