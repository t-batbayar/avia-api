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
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { multerImageOptions } from '../../../config/imageUploadConfig';
import { CmsRoles } from '../../common/decorators/cms-roles.decorator';
import { CmsRolesGuard } from '../../common/guards/cms-roles.guard';
import { CmsUserRoles } from '../cms-users/entities/cms-user.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsService } from './news.service';

@ApiTags('CMS Practice')
@Controller('practice')
// @CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
// @UseGuards(CmsRolesGuard)
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image', multerImageOptions('news')))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                body: { type: 'string' },
                image: { type: 'string', format: 'binary' },
                isFeatured: { type: 'boolean' },
                type: { type: 'string' },
                publishAt: { type: 'string' },
                expireAt: { type: 'string' },
            },
        },
    })
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createPostDto: CreateNewsDto,
    ) {
        return await this.newsService.create(createPostDto, file);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.newsService.findOne(+id);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('image', multerImageOptions('post')))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                body: { type: 'string' },
                image: { type: 'string', format: 'binary' },
                isFeatured: { type: 'boolean' },
                type: { type: 'string' },
                publishAt: { type: 'string' },
                expireAt: { type: 'string' },
            },
        },
    })
    update(
        @Param('id') id: string,
        @Body() updatePostDto: UpdateNewsDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.newsService.update(+id, updatePostDto, file);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.newsService.remove(+id);
    }

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    findAll() {
        return this.newsService.findAll();
    }
}
