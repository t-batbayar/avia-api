import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CmsAuthModule } from '../cms-auth/cms-auth.module';
import { CmsUsersController } from './cms-users.controller';
import { CmsUsersService } from './cms-users.service';
import { CmsUser } from './entities/cms-user.entity';

@Module({
    imports: [
        PassportModule.register({
            session: true,
        }),
        TypeOrmModule.forFeature([CmsUser]),
        CmsAuthModule,
    ],
    providers: [CmsUsersService],
    controllers: [CmsUsersController],
})
export class CmsUsersModule {}
