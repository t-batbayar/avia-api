import { Module } from '@nestjs/common';

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
    ],
    controllers: [],
    providers: [],
})
export class WebModule {}
