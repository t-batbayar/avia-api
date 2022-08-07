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
import { CreateUsageDto } from './dto/create-usage.dto';
import { UpdateUsageDto } from './dto/update-usage.dto';
import { UsageService } from './usage.service';

@ApiTags('CMS  usage')
@Controller('usage')
// @CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
// @UseGuards(CmsRolesGuard)
export class UsageController {
    constructor(private readonly UsageService: UsageService) {}

    @Post()
    create(@Body() createUsageDto: CreateUsageDto) {
        return this.UsageService.create(createUsageDto);
    }

    @Get()
    findAll() {
        return this.UsageService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.UsageService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUsageDto: UpdateUsageDto) {
        return this.UsageService.update(+id, updateUsageDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.UsageService.remove(+id);
    }
}
