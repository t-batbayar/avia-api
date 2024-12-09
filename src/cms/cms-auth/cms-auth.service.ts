import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';

import { CmsUser } from '../cms-users/entities/cms-user.entity';
import { CmsLoginUserDto } from './dto/login-cms-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class CmsAuthService {
    constructor(
        @InjectRepository(CmsUser)
        private cmsUserRepository: EntityRepository<CmsUser>,
    ) {}

    async validateUser(
        user: CmsLoginUserDto,
    ): Promise<Omit<CmsUser, 'password' | 'name'>> {
        const foundUser = await this.cmsUserRepository.findOne({
            email: user.email,
        });

        if (!foundUser || !(await compare(user.password, foundUser.password))) {
            throw new UnauthorizedException(
                'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна',
            );
        }

        // const permissions = await this.cmsPermissionRepo.findOne({
        //     where: {
        //         cmsRoles: foundUser.role,
        //     },
        // });

        // const { password: _password, name: _name, ...retUser } = foundUser;

        // const userWithPermission = {
        //     ...retUser,
        //     allowedRoles: permissions.allowedRoles,
        // };

        return foundUser;
    }

    async findById(id: number): Promise<Omit<CmsUser, 'password'>> {
        const { password: _, ...user } = await this.cmsUserRepository.findOne({
            id,
        });

        if (!user) {
            throw new BadRequestException(`No user found with id ${id}`);
        }

        // const permissions = await this.cmsPermissionRepo.findOne({
        //     where: {
        //         cmsRoles: user.role,
        //     },
        // });

        // const userWithPermission = {
        //     ...user,
        //     allowedRoles: permissions.allowedRoles,
        // };

        return user;
    }
}
