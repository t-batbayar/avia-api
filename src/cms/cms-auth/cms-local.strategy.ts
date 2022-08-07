import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { CmsAuthService } from './cms-auth.service';

@Injectable()
export class CmsLocalStrategy extends PassportStrategy(Strategy, 'cms-local') {
    constructor(private readonly authService: CmsAuthService) {
        super({
            usernameField: 'email',
        });
    }

    async validate(email: string, password: string) {
        return this.authService.validateUser({ email, password });
    }

    // async authenticate() {}
}
