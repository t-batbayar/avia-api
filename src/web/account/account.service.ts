import { Injectable } from '@nestjs/common';

import { User } from '../../cms/users/entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(User)
        private userRepo: EntityRepository<User>,

        private em: EntityManager,
    ) {}

    async remove(headers: { [key: string]: string }) {
        const userEmail = headers['user-email'];
        const userLoginType = headers['user-login-type'];
        const userDeviceId = headers['user-device-id'];
        const user = await this.userRepo.find({
            email: userEmail,
        });
        console.log(user);
        await this.em.remove({
            email: userEmail,
        });

        return 'Done';
    }
}
