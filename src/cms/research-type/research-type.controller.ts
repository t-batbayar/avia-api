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
import { CreateResearchTypeDto } from './dto/create-research-type.dto';
import { UpdateResearchTypeDto } from './dto/update-research-type.dto';
import { ResearchTypeService } from './research-type.service';

@ApiTags('CMS Analysis type')
@Controller('research-type')
@CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
@UseGuards(CmsRolesGuard)
export class ResearchTypeController {
    constructor(private readonly analysisTypeService: ResearchTypeService) {}

    @Post()
    create(@Body() createResearchTypeDto: CreateResearchTypeDto) {
        return this.analysisTypeService.create(createResearchTypeDto);
    }

    @Get()
    findAll() {
        return this.analysisTypeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.analysisTypeService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateResearchTypeDto: UpdateResearchTypeDto,
    ) {
        return this.analysisTypeService.update(+id, updateResearchTypeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.analysisTypeService.remove(+id);
    }
}
