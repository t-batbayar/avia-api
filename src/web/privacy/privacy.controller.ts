import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PrivacyService } from './privacy.service';

@ApiTags('privacy')
@Controller('privacy')
export class PrivacyController {
    constructor(private readonly privacyService: PrivacyService) {}

    @Get()
    findAll() {
        return this.privacyService.findOne();
    }
}
