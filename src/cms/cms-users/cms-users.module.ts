import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { CmsAuthModule } from '../cms-auth/cms-auth.module';
import { CmsUsersController } from './cms-users.controller';
import { CmsUsersService } from './cms-users.service';
import { CmsUser } from './entities/cms-user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [
        PassportModule.register({
            session: true,
        }),
        MikroOrmModule.forFeature([CmsUser]),
        CmsAuthModule,
    ],
    providers: [CmsUsersService],
    controllers: [CmsUsersController],
})
export class CmsUsersModule {}
