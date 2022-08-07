import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Terms } from './entities/terms.entity';
import { TermsController } from './terms.controller';
import { TermsService } from './terms.service';

@Module({
    imports: [TypeOrmModule.forFeature([Terms])],
    controllers: [TermsController],
    providers: [TermsService],
})
export class TermsModule {}
