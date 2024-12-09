import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { Description } from './entities/description.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class DescriptionService {
    constructor(
        @InjectRepository(Description)
        private descRepo: EntityRepository<Description>,
    ) {}

    async create(createDescriptionDto: CreateDescriptionDto) {
        return await this.descRepo.upsert(createDescriptionDto);
    }

    async findAll() {
        return await this.descRepo.findAll({
            orderBy: {
                id: 'DESC',
            },
        });
    }

    async findOne(id: number) {
        return await this.descRepo.findOne(id);
    }

    async update(id: number, updateDescriptionDto: UpdateDescriptionDto) {
        const Desc = await this.descRepo.findOne(id);

        if (!Desc) {
            throw new BadRequestException('Could not find the  description');
        }

        return await this.descRepo.upsert({
            id,
            ...updateDescriptionDto,
        });
    }

    remove(id: number) {
        return `This action should remove a #${id} Description. But it doesn't`;
    }
}
