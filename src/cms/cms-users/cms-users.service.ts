import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';

import { createNotFoundMessage } from '../../../libs/createNotFoundMessage';
import { CreateCmsUserDto } from './dto/create-cms-user.dto';
import { UpdateCmsUserDto } from './dto/update-cms-user.dto';
import { CmsUser } from './entities/cms-user.entity';

@Injectable()
export class CmsUsersService {
    constructor(
        @InjectRepository(CmsUser)
        private cmsUserRepository: Repository<CmsUser>,
    ) {}

    async registerUser(
        user: CreateCmsUserDto,
    ): Promise<Omit<CmsUser, 'password'>> {
        const existingUser = await this.cmsUserRepository.findOne({
            where: {
                email: user.email,
            },
        });

        if (user.password !== user.confirmationPassword) {
            throw new BadRequestException(
                'Password and Confirmation Password must match',
            );
        }

        if (existingUser) {
            throw new BadRequestException(
                `${user.email} is already registered`,
            );
        }

        const { confirmationPassword: _, ...newCmsUser } = user;

        const hashedPassword = await this.hashPassword(user.password);

        return await this.cmsUserRepository.save({
            ...newCmsUser,
            password: hashedPassword,
        });
    }

    async getUsers(): Promise<CmsUser[]> {
        return await this.cmsUserRepository.find({
            order: {
                id: 'DESC',
            },
        });
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

        return user;
    }
    // create(createCmsUserDto: CreateCmsUserDto) {
    //   return 'This action adds a new cmsUser';
    // }

    // findAll() {
    //   return `This action returns all cmsUsers`;
    // }

    // findOne(id: number) {
    //   return `This action returns a #${id} cmsUser`;
    // }

    async update(id: number, updateCmsUserDto: UpdateCmsUserDto) {
        const cmsUser = await this.cmsUserRepository.findOne(id);

        if (!cmsUser) {
            throw new NotFoundException(createNotFoundMessage('Cms user', id));
        }

        if (
            updateCmsUserDto.password &&
            updateCmsUserDto.confirmationPassword
        ) {
            if (
                updateCmsUserDto.password !==
                updateCmsUserDto.confirmationPassword
            ) {
                throw new BadRequestException(
                    'Password and Confirmation password must match',
                );
            }

            delete updateCmsUserDto.confirmationPassword;
            updateCmsUserDto.password = await this.hashPassword(
                updateCmsUserDto.password,
            );
        }

        return await this.cmsUserRepository.update(id, updateCmsUserDto);
    }

    private async hashPassword(password: string): Promise<string> {
        return await hash(password, 12);
    }

    async remove(id: number) {
        return await this.cmsUserRepository.delete(id);
    }

    // remove(id: number) {
    //   return `This action removes a #${id} cmsUser`;
    // }
}
