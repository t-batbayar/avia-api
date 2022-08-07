import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NewsMailLog } from '../mail-service/entities/news-mail-log.entity';

@Injectable()
export class NewsMailSentLogService {
    constructor(
        @InjectRepository(NewsMailLog)
        private newsMailLog: Repository<NewsMailLog>,
    ) {}

    async getLogs() {
        return await this.newsMailLog.find({
            order: {
                id: 'DESC',
            },
        });
    }
}
