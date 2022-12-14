import { Controller, Get, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PracticeService } from './practice.service';

@ApiTags('Practice')
@Controller('practice')
export class PracticeController {
    constructor(private readonly practiceService: PracticeService) {}

    @Get()
    findAll(@Headers() headers) {
        return this.practiceService.findAll(headers);
    }
}
