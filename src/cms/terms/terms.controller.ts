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
import { CreateTermsDto } from './dto/create-terms.dto';
import { UpdateTermsDto } from './dto/update-terms.dto';
import { TermsService } from './terms.service';

@ApiTags('CMS  terms')
@Controller('terms')
// @CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
// @UseGuards(CmsRolesGuard)
export class TermsController {
    constructor(private readonly TermsService: TermsService) {}

    @Post()
    create(@Body() createTermsDto: CreateTermsDto) {
        return this.TermsService.create(createTermsDto);
    }

    @Get()
    findAll() {
        return this.TermsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.TermsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTermsDto: UpdateTermsDto) {
        return this.TermsService.update(+id, updateTermsDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.TermsService.remove(+id);
    }
}
