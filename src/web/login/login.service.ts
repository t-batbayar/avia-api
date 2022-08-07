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
        try {
            const user = await this.userRepo.findOne({
                email: userInfo.email,
            });
            if (!user) {
                const newUser = new User();
                newUser.email = userInfo.email;
                newUser.deviceId = userInfo.deviceId;
                newUser.loginType = userInfo.loginType;
                await this.userRepo.save(newUser);
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
                    message: `Та анх бүртгүүлсэн төхөөрөмжөөсөө хандана уу.`,
                };
            }

            return {
                code: 0,
                status: 'success',
                message: 'Амжилттай нэвтэрлээ',
            };
        } catch (error) {
            return {
                code: 255,
                status: 'fail',
                message: 'Уучлаарай алдаа гарлаа',
            };
        }
    }

    // async findUser(email: string) {
    //     const user = await this.userRepo.findOne({
    //         email
    //     })

    //     return user;
    // }
}
