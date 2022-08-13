import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { multerResourceOptions } from '../../../config/resourceUploadConfig';
import { CmsGuard } from '../../common/guards/cms.guard';
import { CreateSubPracticeDto } from './dto/create-sub-practice.dto';
import { SubPracticeFiles } from './dto/sub-practice-files.dto';
import { UpdateSubPracticeDto } from './dto/update-sub-practice.dto';
import { SubPracticeService } from './sub-practice.service';

@ApiTags('CMS SubPractice')
@Controller('sub-practice/:id')
@UseGuards(CmsGuard)
export class SubPracticeController {
    constructor(private readonly subPracticeService: SubPracticeService) {}

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                {
                    name: 'thumbnail',
                },
                {
                    name: 'video',
                },
            ],
            multerResourceOptions(),
        ),
    )
    @ApiConsumes('multipart/form-data')
    async create(
        @Param('id') id: string,
        @UploadedFiles() files: SubPracticeFiles,
        @Body() createPostDto: CreateSubPracticeDto,
    ) {
        return await this.subPracticeService.create(+id, createPostDto, files);
    }

    @Get(':sid')
    findOne(@Param('sid') sid: string) {
        return this.subPracticeService.findOne(+sid);
    }

    @Patch(':sid')
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                {
                    name: 'thumbnail',
                },
                {
                    name: 'video',
                },
            ],
            multerResourceOptions(),
        ),
    )
    @ApiConsumes('multipart/form-data')
    update(
        @UploadedFiles() files: SubPracticeFiles,
        @Param('sid') sid: string,
        @Body() updatePostDto: UpdateSubPracticeDto,
    ) {
        return this.subPracticeService.update(+sid, updatePostDto, files);
    }

    @Delete(':sid')
    remove(@Param('sid') sid: string) {
        return this.subPracticeService.remove(+sid);
    }

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    findAll(@Param('id') id: string) {
        return this.subPracticeService.findAll(+id);
    }
}
