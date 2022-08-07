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
import { CreatePrivacyDto } from './dto/create-privacy.dto';
import { UpdatePrivacyDto } from './dto/update-privacy.dto';
import { PrivacyService } from './privacy.service';

@ApiTags('CMS  privacy')
@Controller('privacy')
// @CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
// @UseGuards(CmsRolesGuard)
export class PrivacyController {
    constructor(private readonly PrivacyService: PrivacyService) {}

    @Post()
    create(@Body() createPrivacyDto: CreatePrivacyDto) {
        return this.PrivacyService.create(createPrivacyDto);
    }

    @Get()
    findAll() {
        return this.PrivacyService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.PrivacyService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePrivacyDto: UpdatePrivacyDto,
    ) {
        return this.PrivacyService.update(+id, updatePrivacyDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.PrivacyService.remove(+id);
    }
}
