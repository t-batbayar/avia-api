import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UploadedFile,
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
import { CreatePracticeDto } from './dto/create-practice.dto';
import { PracticeImages } from './dto/practice-images.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { PracticeService } from './practice.service';

@ApiTags('CMS Practice')
@Controller('practice')
@UseGuards(CmsGuard)
export class PracticeController {
    constructor(private readonly practiceService: PracticeService) {}

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                {
                    name: 'usegTaviltZurag',
                },
                {
                    name: 'shalgahZuragNeg',
                },
                {
                    name: 'shalgahZuragHoyor',
                },
                {
                    name: 'shalgahZuragGurav',
                },
                {
                    name: 'shalgahZuragDorov',
                },
            ],
            multerResourceOptions(),
        ),
    )
    @ApiConsumes('multipart/form-data')
    async create(
        @UploadedFiles() files: PracticeImages,
        @Body() createPostDto: CreatePracticeDto,
    ) {
        return await this.practiceService.create(createPostDto, files);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.practiceService.findOne(+id);
    }

    @Patch(':id')
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                {
                    name: 'usegTaviltZurag',
                },
                {
                    name: 'shalgahZuragNeg',
                },
                {
                    name: 'shalgahZuragHoyor',
                },
                {
                    name: 'shalgahZuragGurav',
                },
                {
                    name: 'shalgahZuragDorov',
                },
            ],
            multerResourceOptions(),
        ),
    )
    @ApiConsumes('multipart/form-data')
    update(
        @UploadedFiles() files: PracticeImages,
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePracticeDto,
    ) {
        return this.practiceService.update(+id, updatePostDto, files);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.practiceService.remove(+id);
    }

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    findAll() {
        return this.practiceService.findAll();
    }
}
