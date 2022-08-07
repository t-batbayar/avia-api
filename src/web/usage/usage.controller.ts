import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsageService } from './usage.service';

@ApiTags('Usage')
@Controller('usage')
export class UsageController {
    constructor(private readonly usageService: UsageService) {}

    @Get()
    findAll() {
        return this.usageService.findOne();
    }
}
