import {
    BadRequestException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Request } from 'express';
import { Repository } from 'typeorm';

import { CmsPermission } from '../cms-permission/entities/cms-permission.entity';
import { CmsUser } from '../cms-users/entities/cms-user.entity';
import { CmsLoginUserDto } from './dto/login-cms-user.dto';

@Injectable()
export class CmsAuthService {
    constructor(
        @InjectRepository(CmsUser)
        private cmsUserRepository: Repository<CmsUser>,
    ) {}

    async validateUser(
        user: CmsLoginUserDto,
    ): Promise<Omit<CmsUser, 'password' | 'name'>> {
        const foundUser = await this.cmsUserRepository.findOne({
            where: {
                email: user.email,
            },
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
            where: {
                id: id,
            },
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
