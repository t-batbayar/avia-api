import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { CmsLocalGuard } from '../cms-local.guard';
import { CmsLoggedInGuard } from '../cms-logged-in.guard';
import { CmsUser } from '../cms-users/entities/cms-user.entity';
import { CmsAuthService } from './cms-auth.service';
import { CmsLoginUserDto } from './dto/login-cms-user.dto';

@ApiTags('CMS authentication')
@Controller()
export class CmsAuthController {
    constructor(private readonly cmsAuthService: CmsAuthService) {}

    @UseGuards(CmsLocalGuard)
    @Post('login')
    async loginCms(@Body() cmsUser: CmsLoginUserDto) {
        return await this.cmsAuthService.validateUser(cmsUser);
    }

    @Post('logout')
    logoutCms(@Req() req) {
        return req.logout();
    }

    @Get('check-user')
    @UseGuards(CmsLoggedInGuard)
    validateUser(@Req() req: Request) {
        const user = { ...req.user } as Omit<CmsUser, 'password'>;
        delete user.name;
        return user;
    }
}
