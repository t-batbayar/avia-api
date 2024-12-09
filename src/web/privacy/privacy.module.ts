import { Module } from '@nestjs/common';

import { Privacy } from '../../cms/privacy/entities/privacy.entity';
import { PrivacyController } from './privacy.controller';
import { PrivacyService } from './privacy.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature([Privacy])],
    controllers: [PrivacyController],
    providers: [PrivacyService],
})
export class PrivacyModule {}
