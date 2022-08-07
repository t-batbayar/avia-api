import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CmsRoles } from '../../common/decorators/cms-roles.decorator';
import { CmsRolesGuard } from '../../common/guards/cms-roles.guard';
import { CmsUserRoles } from '../cms-users/entities/cms-user.entity';
import { CreateHybridDescriptionDto } from './dto/create-hybrid-description.dto';
import { UpdateHybridDescriptionDto } from './dto/update-hybrid-description.dto';
import { HybridDescriptionService } from './hybrid-description.service';

@ApiTags('CMS Hybrid description')
@Controller('hybrid-description')
@CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
@UseGuards(CmsRolesGuard)
export class HybridDescriptionController {
    constructor(
        private readonly hybridDescriptionService: HybridDescriptionService,
    ) {}

    @Post()
    create(@Body() createHybridDescriptionDto: CreateHybridDescriptionDto) {
        return this.hybridDescriptionService.create(createHybridDescriptionDto);
    }

    @Get()
    findAll() {
        return this.hybridDescriptionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.hybridDescriptionService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateHybridDescriptionDto: UpdateHybridDescriptionDto,
    ) {
        return this.hybridDescriptionService.update(
            +id,
            updateHybridDescriptionDto,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.hybridDescriptionService.remove(+id);
    }
}
