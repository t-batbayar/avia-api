import { Module } from '@nestjs/common';

import { User } from '../../cms/users/entities/user.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature([User])],
    controllers: [AccountController],
    providers: [AccountService],
})
export class AccountModule {}
