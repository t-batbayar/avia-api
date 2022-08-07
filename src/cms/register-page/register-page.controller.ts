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
import { CreateRegisterPageDto } from './dto/create-register-page.dto';
import { UpdateRegisterPageDto } from './dto/update-register-page.dto';
import { RegisterPageService } from './register-page.service';

@ApiTags('CMS Register page')
@Controller('register-page')
@CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
@UseGuards(CmsRolesGuard)
export class RegisterPageController {
    constructor(private readonly registerPageService: RegisterPageService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('image', multerImageOptions('register-page')),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: { type: 'string', format: 'binary' },
            },
        },
    })
    create(
        @Body() createRegisterPageDto: CreateRegisterPageDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.registerPageService.create(createRegisterPageDto, file);
    }

    @Get()
    findAll() {
        return this.registerPageService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.registerPageService.findOne(+id);
    }

    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('image', multerImageOptions('register-page')),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: { type: 'string', format: 'binary' },
            },
        },
    })
    update(
        @Param('id') id: string,
        @Body() updateRegisterPageDto: UpdateRegisterPageDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.registerPageService.update(
            +id,
            updateRegisterPageDto,
            file,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.registerPageService.remove(+id);
    }
}
