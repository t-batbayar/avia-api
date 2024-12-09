import { Module } from '@nestjs/common';

import { DescriptionController } from './description.controller';
import { DescriptionService } from './description.service';
import { Description } from './entities/description.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature([Description])],
    controllers: [DescriptionController],
    providers: [DescriptionService],
})
export class DescriptionModule {}
