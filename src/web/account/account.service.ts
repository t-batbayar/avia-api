import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../cms/users/entities/user.entity';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    async remove(headers: { [key: string]: string }) {
        const userEmail = headers['user-email'];
        const userLoginType = headers['user-login-type'];
        const userDeviceId = headers['user-device-id'];
        const user = await this.userRepo.find({
            email: userEmail,
        });
        console.log(user);
        await this.userRepo.delete({
            email: userEmail,
        });

        return 'Done';
    }
}
