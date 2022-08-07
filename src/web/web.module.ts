import { Module } from '@nestjs/common';

import { DescriptionModule } from './description/description.module';
import { PracticeModule } from './practice/practice.module';
import { PrivacyModule } from './privacy/privacy.module';
import { TermsModule } from './terms/terms.module';
import { UsageModule } from './usage/usage.module';
import { LoginModule } from './login/login.module';
import { PaymentStatusModule } from './payment-status/payment-status.module';

@Module({
    imports: [
        DescriptionModule,
        PracticeModule,
        PrivacyModule,
        TermsModule,
        UsageModule,
        LoginModule,
        PaymentStatusModule,
    ],
    controllers: [],
    providers: [],
})
export class WebModule {}
