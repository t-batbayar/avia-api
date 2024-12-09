import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';

import { User } from '../cms/users/entities/user.entity';
import { AuthMiddleware } from '../common/middleware/auth.middleware';
import { AccountModule } from './account/account.module';
import { DescriptionModule } from './description/description.module';
import { LoginModule } from './login/login.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentStatusModule } from './payment-status/payment-status.module';
import { PracticeModule } from './practice/practice.module';
import { PrivacyModule } from './privacy/privacy.module';
import { TermsModule } from './terms/terms.module';
import { UsageModule } from './usage/usage.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [
        AccountModule,
        DescriptionModule,
        PracticeModule,
        PrivacyModule,
        TermsModule,
        UsageModule,
        LoginModule,
        PaymentStatusModule,
        PaymentModule,
        MikroOrmModule.forFeature([User]),
    ],
    controllers: [],
    providers: [],
})
export class WebModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                {
                    path: `/admin(.*)`,
                    method: RequestMethod.ALL,
                },
                {
                    path: `/privacy`,
                    method: RequestMethod.GET,
                },
                {
                    path: `/terms`,
                    method: RequestMethod.GET,
                },
                {
                    path: `/usage`,
                    method: RequestMethod.GET,
                },
                {
                    path: `/login`,
                    method: RequestMethod.POST,
                },
                {
                    path: `/webhook(.*)`,
                    method: RequestMethod.GET,
                },
            )
            .forRoutes('*');
    }
}
