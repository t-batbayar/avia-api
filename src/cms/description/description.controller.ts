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
import { DescriptionService } from './description.service';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';

@ApiTags('CMS  description')
@Controller('description')
// @CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
// @UseGuards(CmsRolesGuard)
export class DescriptionController {
    constructor(private readonly DescriptionService: DescriptionService) {}

    @Post()
    create(@Body() createDescriptionDto: CreateDescriptionDto) {
        return this.DescriptionService.create(createDescriptionDto);
    }

    @Get()
    findAll() {
        return this.DescriptionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.DescriptionService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateDescriptionDto: UpdateDescriptionDto,
    ) {
        return this.DescriptionService.update(+id, updateDescriptionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.DescriptionService.remove(+id);
    }
}
