import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePrivacyDto } from './dto/create-privacy.dto';
import { UpdatePrivacyDto } from './dto/update-privacy.dto';
import { Privacy } from './entities/privacy.entity';

@Injectable()
export class PrivacyService {
    constructor(
        @InjectRepository(Privacy)
        private DescRepo: Repository<Privacy>,
    ) {}

    async create(createPrivacyDto: CreatePrivacyDto) {
        return await this.DescRepo.save(createPrivacyDto);
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

    async update(id: number, updatePrivacyDto: UpdatePrivacyDto) {
        const Desc = await this.DescRepo.findOne(id);

        if (!Desc) {
            throw new BadRequestException('Could not find the  privacy');
        }

        return await this.DescRepo.save({
            id,
            ...updatePrivacyDto,
        });
    }

    remove(id: number) {
        return `This action should remove a #${id} Privacy. But it doesn't`;
    }
}
