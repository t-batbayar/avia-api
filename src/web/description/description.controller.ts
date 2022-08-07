import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DescriptionService } from './description.service';

@ApiTags('Description')
@Controller('description')
export class DescriptionController {
    constructor(private readonly descriptionService: DescriptionService) {}

    @Get()
    findAll() {
        return this.descriptionService.findAll();
    }
}
