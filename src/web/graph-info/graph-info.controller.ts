import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GraphInfoService } from './graph-info.service';

@ApiTags('Graph Info')
@Controller('graph-info')
export class GraphInfoController {
    constructor(private readonly graphInfoService: GraphInfoService) {}

    @Get('sector-info')
    getSectorInfo() {
        return this.graphInfoService.getSectorInfo();
    }
}
