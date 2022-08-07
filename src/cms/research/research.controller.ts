import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    StreamableFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { multerResourceOptions } from '../../../config/resourceUploadConfig';
import { CmsRoles } from '../../common/decorators/cms-roles.decorator';
import { CmsRolesGuard } from '../../common/guards/cms-roles.guard';
import { CmsUserRoles } from '../cms-users/entities/cms-user.entity';
import { CreateResearchDto } from './dto/create-research.dto';
import { FindAllResearchQueryDto } from './dto/find-all-research-query.dto';
import { ResearchFiles } from './dto/research-files.dto';
import { UpdateResearchDto } from './dto/update-research.dto';
import { ResearchService } from './research.service';

@ApiTags('CMS Research')
@Controller('research')
@CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
@UseGuards(CmsRolesGuard)
export class ResearchController {
    constructor(private readonly researchService: ResearchService) {}

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                {
                    name: 'fileXlsx',
                },
                {
                    name: 'filePdf',
                },
                {
                    name: 'fileWord',
                },
                {
                    name: 'filePpt',
                },
                {
                    name: 'fileJpg',
                },
                {
                    name: 'fileMp3',
                },
            ],
            multerResourceOptions(),
        ),
    )
    @ApiConsumes('multipart/form-data')
    create(
        @UploadedFiles()
        files: ResearchFiles,
        @Body() createAnalysisDto: CreateResearchDto,
    ) {
        return this.researchService.create(createAnalysisDto, files);
    }

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    findAll(@Query() query: FindAllResearchQueryDto) {
        const { page, perPage, title, type } = query;
        return this.researchService.findAll(page, perPage, title, type);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.researchService.findOne(+id);
    }

    @Patch(':id')
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                {
                    name: 'fileXlsx',
                },
                {
                    name: 'filePdf',
                },
                {
                    name: 'fileWord',
                },
                {
                    name: 'filePpt',
                },
                {
                    name: 'fileJpg',
                },
                {
                    name: 'fileMp3',
                },
            ],
            multerResourceOptions(),
        ),
    )
    @ApiConsumes('multipart/form-data')
    update(
        @UploadedFiles()
        files: ResearchFiles,
        @Param('id') id: string,
        @Body() updateAnalysisDto: UpdateResearchDto,
    ) {
        return this.researchService.update(+id, updateAnalysisDto, files);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.researchService.remove(+id);
    }

    @Get('resource/:filename')
    async getResource(@Param('filename') filename: string) {
        const file = await this.researchService.getResourceFile(filename);
        return new StreamableFile(file);
    }
}
