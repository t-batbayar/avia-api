import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TermsService } from './terms.service';

@ApiTags('Terms')
@Controller('terms')
export class TermsController {
    constructor(private readonly termsService: TermsService) {}

    @Get()
    findAll() {
        return this.termsService.findOne();
    }
}
