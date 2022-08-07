import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NewsMailSentLogService } from './news-mail-sent-log.service';

@ApiTags('CMS Mail Sent Log')
@Controller('news-mail-sent-log')
export class NewsMailSentLogController {
    constructor(
        private readonly newsMailSentLogService: NewsMailSentLogService,
    ) {}

    @Get()
    async getLogs() {
        return this.newsMailSentLogService.getLogs();
    }
}
