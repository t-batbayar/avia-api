import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsMailLog } from '../mail-service/entities/news-mail-log.entity';
import { NewsMailSentLogController } from './news-mail-sent-log.controller';
import { NewsMailSentLogService } from './news-mail-sent-log.service';

@Module({
    imports: [TypeOrmModule.forFeature([NewsMailLog])],
    controllers: [NewsMailSentLogController],
    providers: [NewsMailSentLogService],
})
export class NewsMailSentLogModule {}
