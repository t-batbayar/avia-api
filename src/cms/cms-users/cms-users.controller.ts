import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CmsRoles } from '../../common/decorators/cms-roles.decorator';
import { CmsRolesGuard } from '../../common/guards/cms-roles.guard';
import { CmsUsersService } from './cms-users.service';
import { CreateCmsUserDto } from './dto/create-cms-user.dto';
import { UpdateCmsUserDto } from './dto/update-cms-user.dto';
import { CmsUserRoles } from './entities/cms-user.entity';

@ApiTags('CMS users')
@Controller('cms-users')
// @CmsRoles(CmsUserRoles.ADMIN)
// @UseGuards(CmsRolesGuard)
export class CmsUsersController {
    constructor(private readonly cmsUsersService: CmsUsersService) {}

    @Post()
    registerCmsUser(@Body() user: CreateCmsUserDto) {
        return this.cmsUsersService.registerUser(user);
    }

    @Get()
    async getCmsUsers() {
        return await this.cmsUsersService.getUsers();
    }

    @Get(':id')
    async getCmsUser(@Param('id') id: string) {
        return await this.cmsUsersService.findById(+id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCmsUserDto: UpdateCmsUserDto,
    ) {
        const result = await this.cmsUsersService.update(+id, updateCmsUserDto);

        return result;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cmsUsersService.remove(+id);
    }
}
