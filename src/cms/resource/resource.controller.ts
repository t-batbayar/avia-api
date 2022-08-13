import {
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { multerImageOptions } from '../../../config/imageUploadConfig';
import { CmsRoles } from '../../common/decorators/cms-roles.decorator';
import { CmsRolesGuard } from '../../common/guards/cms-roles.guard';
import { CmsUserRoles } from '../cms-users/entities/cms-user.entity';
import { ResourceService } from './resource.service';

@ApiTags('Resource')
@Controller('resource')
@CmsRoles(CmsUserRoles.ADMIN, CmsUserRoles.ANALYST, CmsUserRoles.PUBLISHER)
@UseGuards(CmsRolesGuard)
export class ResourceController {
    constructor(private readonly configService: ConfigService) {}

    @Post('wysiwyg-upload')
    @UseInterceptors(FileInterceptor('upload', multerImageOptions('resource')))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        const mainConfig = this.configService.get('main');
        const response = {
            uploaded: true,
            url:
                mainConfig.domain +
                file.path.replace('public', '/public-resource'),
        };

        return response;
    }
}
