import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HybridMoreResearchDto } from './dto/hybrid-more-research.dto';
import { HybridService } from './hybrid.service';

@ApiTags('Hybrid')
@Controller()
export class HybridController {
    constructor(private readonly hybridService: HybridService) {}

    @Get('hybrid-description')
    async getDescription() {
        return this.hybridService.getDescription();
    }

    @Get('hybrid-contact')
    async getContact() {
        return await this.hybridService.getContacts();
    }

    @Get('hybrid-research')
    async getResearches() {
        return await this.hybridService.getResearches();
    }

    @Get('hybrid-more-research')
    async getMoreResearches(
        @Query() hybridMoreResearchDto: HybridMoreResearchDto,
    ) {
        return await this.hybridService.getMoreResearches(
            hybridMoreResearchDto,
        );
    }
}
