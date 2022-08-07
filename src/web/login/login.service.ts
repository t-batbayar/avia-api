import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../cms/users/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    async login(userInfo: LoginUserDto) {
        const user = await this.userRepo.findOne({
            email: userInfo.email,
        });

        if (!user) {
            const newUser = new User();
            newUser.email = userInfo.email;
            newUser.deviceId = userInfo.deviceId;
            newUser.loginType = userInfo.loginType;

            return {
                code: 0,
                status: 'success',
                message: 'Шинэ хэрэглэгчийг амжилттай бүртгэлээ',
            };
        }

        if (user && !user.deviceId) {
            user.deviceId = userInfo.deviceId;

            await this.userRepo.save(user);
            return {
                code: 0,
                status: 'success',
                message: 'Хэрэглэгчийг амжилттай шинэчлэлээ',
            };
        }

        if (user && user.deviceId !== userInfo.deviceId) {
            return {
                code: 255,
                status: 'fail',
                message: `Хэрэглэгчийн бүртгүүлсэн төхөөрөмж тохирохгүй байна.`,
            };
        }

        return {
            code: 255,
            status: 'success',
            message: 'Амжилттай нэвтэрлээ',
        };
    }

    // async findUser(email: string) {
    //     const user = await this.userRepo.findOne({
    //         email
    //     })

    //     return user;
    // }
}
