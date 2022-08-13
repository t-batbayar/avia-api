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
import { CreateTermsDto } from './dto/create-terms.dto';
import { UpdateTermsDto } from './dto/update-terms.dto';
import { TermsService } from './terms.service';

@ApiTags('CMS  terms')
@Controller('terms')
@UseGuards(CmsGuard)
export class TermsController {
    constructor(private readonly termsService: TermsService) {}

    @Post()
    create(@Body() createTermsDto: CreateTermsDto) {
        return this.termsService.create(createTermsDto);
    }

    @Get()
    findAll() {
        return this.termsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.termsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTermsDto: UpdateTermsDto) {
        return this.termsService.update(+id, updateTermsDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.termsService.remove(+id);
    }
}
