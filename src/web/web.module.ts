import { Module } from '@nestjs/common';

import { DescriptionModule } from './description/description.module';
import { PracticeModule } from './practice/practice.module';
import { PrivacyModule } from './privacy/privacy.module';
import { TermsModule } from './terms/terms.module';
import { UsageModule } from './usage/usage.module';
import { LoginModule } from './login/login.module';

@Module({
    imports: [
        DescriptionModule,
        PracticeModule,
        PrivacyModule,
        TermsModule,
        UsageModule,
        LoginModule,
    ],
    controllers: [],
    providers: [],
})
export class WebModule {}
