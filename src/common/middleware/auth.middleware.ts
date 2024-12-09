// dio.options.headers['user-email'] = loginInfo['email'];
// dio.options.headers['user-login-type'] = loginInfo['loginType'];
// dio.options.headers['user-device-id'] = loginInfo['deviceId'];

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { User } from '../../cms/users/entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        @InjectRepository(User)
        private userRepo: EntityRepository<User>,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const headers = req.headers;
        const email = headers['user-email'];
        const loginType = headers['user-login-type'];
        const deviceId = headers['user-device-id'];

        if (!email || !loginType || !deviceId) {
            return res
                .status(401)
                .json({ message: 'Invalid Authentication Credentials' });
        }

        const user = await this.userRepo.findOne({
            email: email,
        });

        if (!user || user.userIsBlocked) {
            return res
                .status(401)
                .json({ message: 'Invalid Authentication Credentials' });
        }

        req.user = {
            email: user.email,
            deviceId: user.deviceId,
            loginType: user.deviceId,
        };
        next();
    }
}
