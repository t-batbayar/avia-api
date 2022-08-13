import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    findAll() {
        return this.userRepo.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    async blockUser(id: number) {
        const user = await this.userRepo.findOne(id);
        if (!user) {
            throw new Error(`Couldn't find the user with the id: ${id}`);
        }

        user.userIsBlocked = true;
        return await this.userRepo.save(user);
    }

    async unblockUser(id: number) {
        const user = await this.userRepo.findOne(id);
        if (!user) {
            throw new Error(`Couldn't find the user with the id: ${id}`);
        }

        user.userIsBlocked = false;
        return await this.userRepo.save(user);
    }
}
