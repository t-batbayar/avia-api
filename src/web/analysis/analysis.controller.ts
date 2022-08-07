import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AnalysisService } from './analysis.service';

@ApiTags('Analysis')
@Controller('analysis')
export class AnalysisController {
    constructor(private readonly analysisService: AnalysisService) {}

    @Get()
    getFeatured() {
        return this.analysisService.getFeatured();
    }

    @Get('report-list-thumb')
    async getReportListThumb(@Query('page') page: string) {
        return await this.analysisService.getThumbList(+page);
    }
}
