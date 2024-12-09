import { Module } from '@nestjs/common';

import { Description } from '../../cms/description/entities/description.entity';
import { DescriptionController } from './description.controller';
import { DescriptionService } from './description.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature([Description])],
    controllers: [DescriptionController],
    providers: [DescriptionService],
})
export class DescriptionModule {}
