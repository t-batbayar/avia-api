import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUsageDto } from './dto/create-usage.dto';
import { UpdateUsageDto } from './dto/update-usage.dto';
import { Usage } from './entities/usage.entity';

@Injectable()
export class UsageService {
    constructor(
        @InjectRepository(Usage)
        private DescRepo: Repository<Usage>,
    ) {}

    async create(createUsageDto: CreateUsageDto) {
        return await this.DescRepo.save(createUsageDto);
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

    async update(id: number, updateUsageDto: UpdateUsageDto) {
        const Desc = await this.DescRepo.findOne(id);

        if (!Desc) {
            throw new BadRequestException('Could not find the  usage');
        }

        return await this.DescRepo.save({
            id,
            ...updateUsageDto,
        });
    }

    remove(id: number) {
        return `This action should remove a #${id} Usage. But it doesn't`;
    }
}
