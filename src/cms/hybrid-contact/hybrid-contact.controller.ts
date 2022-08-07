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

import { multerImageOptions } from '../../../config/imageUploadConfig';
import { CmsRoles } from '../../common/decorators/cms-roles.decorator';
import { CmsRolesGuard } from '../../common/guards/cms-roles.guard';
import { CmsUserRoles } from '../cms-users/entities/cms-user.entity';
import { CreateHybridContactDto } from './dto/create-hybrid-contact.dto';
import { UpdateHybridContactDto } from './dto/update-hybrid-contact.dto';
import { HybridContactService } from './hybrid-contact.service';

@ApiTags('CMS hybrid-contact')
@Controller('hybrid-contact')
@CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
@UseGuards(CmsRolesGuard)
export class HybridContactController {
    constructor(private readonly hybridContactService: HybridContactService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('image', multerImageOptions('hybrid-contacts')),
    )
    @ApiConsumes('multipart/form-data')
    create(
        @Body() createHybridContactDto: CreateHybridContactDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.hybridContactService.create(createHybridContactDto, file);
    }

    @Get()
    findAll() {
        return this.hybridContactService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.hybridContactService.findOne(+id);
    }

    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('image', multerImageOptions('hybrid-contacts')),
    )
    @ApiConsumes('multipart/form-data')
    update(
        @Param('id') id: string,
        @Body() updateHybridContactDto: UpdateHybridContactDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.hybridContactService.update(
            +id,
            updateHybridContactDto,
            file,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.hybridContactService.remove(+id);
    }
}
