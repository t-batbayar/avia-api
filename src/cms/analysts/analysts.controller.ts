import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { multerImageOptions } from '../../../config/imageUploadConfig';
import { CmsRoles } from '../../common/decorators/cms-roles.decorator';
import { CmsRolesGuard } from '../../common/guards/cms-roles.guard';
import { CmsUserRoles } from '../cms-users/entities/cms-user.entity';
import { AnalystsService } from './analysts.service';
import { CreateAnalystDto } from './dto/create-analyst.dto';
import { UpdateAnalystDto } from './dto/update-analyst.dto';

@ApiTags('CMS Analyst')
@Controller('analysts')
@CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
@UseGuards(CmsRolesGuard)
export class AnalystsController {
    constructor(private readonly analystsService: AnalystsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image', multerImageOptions('analyst')))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                position: { type: 'string' },
                image: { type: 'string', format: 'binary' },
            },
        },
    })
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createAnalystDto: CreateAnalystDto,
    ) {
        return this.analystsService.create(createAnalystDto, file);
    }

    @Get()
    findAll() {
        return this.analystsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.analystsService.findOne(+id);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('image', multerImageOptions('analyst')))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                position: { type: 'string' },
                image: { type: 'string', format: 'binary' },
            },
        },
    })
    update(
        @Param('id') id: string,
        @Body() updateAnalystDto: UpdateAnalystDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.analystsService.update(+id, updateAnalystDto, file);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.analystsService.remove(+id);
    }
}
