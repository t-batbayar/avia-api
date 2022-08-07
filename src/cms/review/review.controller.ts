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
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewService } from './review.service';

@ApiTags('CMS Review')
@Controller('review')
@CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
@UseGuards(CmsRolesGuard)
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image', multerImageOptions('review')))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                position: { type: 'string' },
                quote: { type: 'string' },
                image: { type: 'string', format: 'binary' },
            },
        },
    })
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createReviewDto: CreateReviewDto,
    ) {
        return this.reviewService.create(createReviewDto, file);
    }

    @Get()
    findAll() {
        return this.reviewService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reviewService.findOne(+id);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('image', multerImageOptions('review')))
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
        @Body() updateReviewDto: UpdateReviewDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.reviewService.update(+id, updateReviewDto, file);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reviewService.remove(+id);
    }
}
