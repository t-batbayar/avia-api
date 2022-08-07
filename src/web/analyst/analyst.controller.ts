import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AnalystService } from './analyst.service';

@ApiTags('Analyst')
@Controller('analyst')
export class AnalystController {
    constructor(private readonly analystService: AnalystService) {}

    @Get()
    async getAnalysts() {
        return await this.analystService.getAnalysts();
    }
}
