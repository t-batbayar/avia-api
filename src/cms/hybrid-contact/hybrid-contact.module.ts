import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HybridContact } from './entities/hybrid-contact.entity';
import { HybridContactController } from './hybrid-contact.controller';
import { HybridContactService } from './hybrid-contact.service';

@Module({
    imports: [TypeOrmModule.forFeature([HybridContact])],
    controllers: [HybridContactController],
    providers: [HybridContactService],
})
export class HybridContactModule {}
