import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { Description } from './entities/description.entity';

@Injectable()
export class DescriptionService {
    constructor(
        @InjectRepository(Description)
        private DescRepo: Repository<Description>,
    ) {}

    async create(createDescriptionDto: CreateDescriptionDto) {
        return await this.DescRepo.save(createDescriptionDto);
    }

    async findAll() {
        return await this.DescRepo.find({
            order: {
                id: 'DESC',
            },
        });
    }

    async findOne(id: number) {
        return await this.DescRepo.findOne(id);
    }

    async update(id: number, updateDescriptionDto: UpdateDescriptionDto) {
        const Desc = await this.DescRepo.findOne(id);

        if (!Desc) {
            throw new BadRequestException('Could not find the  description');
        }

        return await this.DescRepo.save({
            id,
            ...updateDescriptionDto,
        });
    }

    remove(id: number) {
        return `This action should remove a #${id} Description. But it doesn't`;
    }
}
