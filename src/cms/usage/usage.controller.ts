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

import { CmsGuard } from '../../common/guards/cms.guard';
import { CreateUsageDto } from './dto/create-usage.dto';
import { UpdateUsageDto } from './dto/update-usage.dto';
import { UsageService } from './usage.service';

@ApiTags('CMS  usage')
@Controller('usage')
@UseGuards(CmsGuard)
export class UsageController {
    constructor(private readonly usageService: UsageService) {}

    @Post()
    create(@Body() createUsageDto: CreateUsageDto) {
        return this.usageService.create(createUsageDto);
    }

    @Get()
    findAll() {
        return this.usageService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usageService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUsageDto: UpdateUsageDto) {
        return this.usageService.update(+id, updateUsageDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usageService.remove(+id);
    }
}
