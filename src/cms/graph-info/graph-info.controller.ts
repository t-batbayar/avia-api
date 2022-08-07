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
import { CreateGraphInfoDto } from './dto/create-graph-info.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { GraphInfoService } from './graph-info.service';

@ApiTags('CMS Graph info')
@Controller('graph-info')
@CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
@UseGuards(CmsRolesGuard)
export class GraphInfoController {
    constructor(private readonly graphInfoService: GraphInfoService) {}

    @Post()
    create(@Body() createGraphInfoDto: CreateGraphInfoDto) {
        return this.graphInfoService.create(createGraphInfoDto);
    }

    @Get('sector-main')
    findAllSector() {
        return this.graphInfoService.findAllSector();
    }

    @Get('sector-main/:id')
    getSector(@Param('id') id: string) {
        return this.graphInfoService.getSector(+id);
    }

    @Patch('sector-main/:id')
    updateSector(
        @Param('id') id: string,
        @Body() updateSectorDto: UpdateSectorDto,
    ) {
        return this.graphInfoService.updateSector(+id, updateSectorDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.graphInfoService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateGraphInfoDto: UpdateSectorDto,
    ) {
        return this.graphInfoService.updateSector(+id, updateGraphInfoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.graphInfoService.remove(+id);
    }
}
