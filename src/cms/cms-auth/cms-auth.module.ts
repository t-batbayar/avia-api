import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { CmsUser } from '../cms-users/entities/cms-user.entity';
import { CmsAuthController } from './cms-auth.controller';
import { CmsAuthService } from './cms-auth.service';
import { CmsLocalStrategy } from './cms-local.strategy';
import { CmsAuthSerializer } from './cms-serialization.provider';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [
        PassportModule.register({
            session: true,
        }),
        MikroOrmModule.forFeature([CmsUser]),
    ],
    providers: [CmsAuthService, CmsLocalStrategy, CmsAuthSerializer],
    controllers: [CmsAuthController],
})
export class CmsAuthModule {}
