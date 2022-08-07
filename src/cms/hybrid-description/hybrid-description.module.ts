import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HybridDescription } from './entities/hybrid-description.entity';
import { HybridDescriptionController } from './hybrid-description.controller';
import { HybridDescriptionService } from './hybrid-description.service';

@Module({
    imports: [TypeOrmModule.forFeature([HybridDescription])],
    controllers: [HybridDescriptionController],
    providers: [HybridDescriptionService],
})
export class HybridDescriptionModule {}
