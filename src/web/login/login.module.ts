import { Module } from '@nestjs/common';

import { User } from '../../cms/users/entities/user.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature([User])],
    controllers: [LoginController],
    providers: [LoginService],
})
export class LoginModule {}
