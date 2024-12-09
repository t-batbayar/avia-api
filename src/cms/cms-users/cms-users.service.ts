import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';

import { createNotFoundMessage } from '../../../libs/createNotFoundMessage';
import { CreateCmsUserDto } from './dto/create-cms-user.dto';
import { UpdateCmsUserDto } from './dto/update-cms-user.dto';
import { CmsUser } from './entities/cms-user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class CmsUsersService {
    constructor(
        @InjectRepository(CmsUser)
        private cmsUserRepository: EntityRepository<CmsUser>,
        private readonly em: EntityManager,
    ) {}

    async registerUser(
        user: CreateCmsUserDto,
    ): Promise<Omit<CmsUser, 'password'>> {
        const existingUser = await this.cmsUserRepository.findOne({
            email: user.email,
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

        return await this.cmsUserRepository.upsert({
            ...newCmsUser,
            password: hashedPassword,
        });
    }

    async getUsers(): Promise<CmsUser[]> {
        return await this.cmsUserRepository.findAll({
            orderBy: {
                id: 'DESC',
            },
        });
    }

    async findById(id: number): Promise<Omit<CmsUser, 'password'>> {
        const { password: _, ...user } = await this.cmsUserRepository.findOne({
            id,
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

        return await this.em.insert(updateCmsUserDto);
    }

    private async hashPassword(password: string): Promise<string> {
        return await hash(password, 12);
    }

    async remove(id: number) {
        const user = await this.cmsUserRepository.findOne(id);

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Mark entity for removal
        await this.em.removeAndFlush(user);

        return { deleted: true, id };
    }

    // remove(id: number) {
    //   return `This action removes a #${id} cmsUser`;
    // }
}
