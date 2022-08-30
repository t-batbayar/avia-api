// dio.options.headers['user-email'] = loginInfo['email'];
// dio.options.headers['user-login-type'] = loginInfo['loginType'];
// dio.options.headers['user-device-id'] = loginInfo['deviceId'];

import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';

import { User } from '../../cms/users/entities/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
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
            where: {
                email: email,
            },
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
