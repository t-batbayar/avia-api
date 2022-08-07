import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RegisterPage } from '../../cms/register-page/entities/register-page.entity';
import { RegisterPageController } from './register-page.controller';
import { RegisterPageService } from './register-page.service';

@Module({
    imports: [TypeOrmModule.forFeature([RegisterPage])],
    controllers: [RegisterPageController],
    providers: [RegisterPageService],
})
export class RegisterPageModule {}
