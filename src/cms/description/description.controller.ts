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
import { DescriptionService } from './description.service';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';

@ApiTags('CMS  description')
@Controller('description')
@UseGuards(CmsGuard)
export class DescriptionController {
    constructor(private readonly descriptionService: DescriptionService) {}

    @Post()
    create(@Body() createDescriptionDto: CreateDescriptionDto) {
        return this.descriptionService.create(createDescriptionDto);
    }

    @Get()
    findAll() {
        return this.descriptionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.descriptionService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateDescriptionDto: UpdateDescriptionDto,
    ) {
        return this.descriptionService.update(+id, updateDescriptionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.descriptionService.remove(+id);
    }
}
