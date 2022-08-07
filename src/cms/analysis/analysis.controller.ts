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
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { multerAnalysisOptions } from '../../../config/analysisUploadConfig';
import { CmsRoles } from '../../common/decorators/cms-roles.decorator';
import { CmsRolesGuard } from '../../common/guards/cms-roles.guard';
import { CmsUserRoles } from '../cms-users/entities/cms-user.entity';
import { AnalysisService } from './analysis.service';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';

@ApiTags('CMS Analysis')
@Controller('analysis')
@CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
@UseGuards(CmsRolesGuard)
export class AnalysisController {
    constructor(private readonly analysisService: AnalysisService) {}

    @Post()
    @UseInterceptors(FileInterceptor('filePdf', multerAnalysisOptions()))
    @ApiConsumes('multipart/form-data')
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createAnalysisDto: CreateAnalysisDto,
    ) {
        return this.analysisService.create(createAnalysisDto, file);
    }

    @Get()
    findAll() {
        return this.analysisService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.analysisService.findOne(+id);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('filePdf', multerAnalysisOptions()))
    @ApiConsumes('multipart/form-data')
    update(
        @Param('id') id: string,
        @Body() updateAnalysisDto: UpdateAnalysisDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.analysisService.update(+id, updateAnalysisDto, file);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.analysisService.remove(+id);
    }
}
