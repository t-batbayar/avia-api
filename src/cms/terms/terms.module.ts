import { Module } from '@nestjs/common';

import { Terms } from './entities/terms.entity';
import { TermsController } from './terms.controller';
import { TermsService } from './terms.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature([Terms])],
    controllers: [TermsController],
    providers: [TermsService],
})
export class TermsModule {}
