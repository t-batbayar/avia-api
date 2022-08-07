import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RegisterPageService } from './register-page.service';

@ApiTags('Registration')
@Controller('register-page')
export class RegisterPageController {
    constructor(private readonly registerPageService: RegisterPageService) {}

    @Get()
    getPageInfo() {
        return this.registerPageService.getPage();
    }
}
