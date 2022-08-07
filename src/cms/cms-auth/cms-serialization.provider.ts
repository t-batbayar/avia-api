import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { CmsUser } from '../cms-users/entities/cms-user.entity';
import { CmsAuthService } from './cms-auth.service';

@Injectable()
export class CmsAuthSerializer extends PassportSerializer {
    constructor(private readonly cmsAuthService: CmsAuthService) {
        super();
    }

    serializeUser(user: any, done: (err: Error, user: any) => void) {
        done(null, {
            id: user.id,
            role: user.role,
            email: user.email,
        });
    }

    async deserializeUser(
        payload: { id: number; role: string; email: string },
        done: (err: Error, user: any) => void,
    ) {
        const user = await this.cmsAuthService.findById(payload.id);
        done(null, user);
    }
}
