import { Body, Controller, Post } from '@nestjs/common';

import { LoginUserDto } from './dto/login-user.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    findAll(@Body() userInfo: LoginUserDto) {
        return this.loginService.login(userInfo);
    }
}
