import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';

import { CMS_SESSION_CONFIG } from '../../config/cmsSessionConfig';
import { CmsAuthModule } from './cms-auth/cms-auth.module';
import { CmsUsersModule } from './cms-users/cms-users.module';
import { DescriptionModule } from './description/description.module';
import { PracticeModule } from './practice/practice.module';
import { PrivacyModule } from './privacy/privacy.module';
import { SubPracticeModule } from './sub-practice/sub-practice.module';
import { TermsModule } from './terms/terms.module';
import { UsageModule } from './usage/usage.module';
import { UsersModule } from './users/users.module';

const aviaAdminPrefix = 'admin';

@Module({
    imports: [
        RouterModule.register([
            {
                path: aviaAdminPrefix,
                module: CmsUsersModule,
            },
            {
                path: aviaAdminPrefix,
                module: CmsAuthModule,
            },
            {
                path: aviaAdminPrefix,
                module: DescriptionModule,
            },
            {
                path: aviaAdminPrefix,
                module: TermsModule,
            },
            {
                path: aviaAdminPrefix,
                module: UsageModule,
            },
            {
                path: aviaAdminPrefix,
                module: PrivacyModule,
            },
            {
                path: aviaAdminPrefix,
                module: PracticeModule,
            },
            {
                path: aviaAdminPrefix,
                module: SubPracticeModule,
            },
        ]),
        CmsAuthModule,
        CmsUsersModule,
        DescriptionModule,
        TermsModule,
        UsageModule,
        PrivacyModule,
        PracticeModule,
        SubPracticeModule,
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class CmsModule implements NestModule {
    constructor(
        private configService: ConfigService, // @Inject(REDIS) private readonly redis: RedisClient,
    ) {}

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                session({
                    ...this.configService.get(CMS_SESSION_CONFIG),
                }),
                passport.initialize(),
                passport.session(),
            )
            .forRoutes(aviaAdminPrefix);
    }
}
