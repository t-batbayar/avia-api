import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DescriptionController } from './description.controller';
import { DescriptionService } from './description.service';
import { Description } from './entities/description.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Description])],
    controllers: [DescriptionController],
    providers: [DescriptionService],
})
export class DescriptionModule {}
