import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateHybridDescriptionDto } from './dto/create-hybrid-description.dto';
import { UpdateHybridDescriptionDto } from './dto/update-hybrid-description.dto';
import { HybridDescription } from './entities/hybrid-description.entity';

@Injectable()
export class HybridDescriptionService {
    constructor(
        @InjectRepository(HybridDescription)
        private hybridDescRepo: Repository<HybridDescription>,
    ) {}

    async create(createHybridDescriptionDto: CreateHybridDescriptionDto) {
        const hybridDesc = await this.hybridDescRepo.find();

        if (hybridDesc.length) {
            throw new BadRequestException(
                'There is already description in the database',
            );
        }

        return await this.hybridDescRepo.save(createHybridDescriptionDto);
    }

    async findAll() {
        return await this.hybridDescRepo.find({
            order: {
                id: 'DESC',
            },
        });
    }

    async findOne(id: number) {
        return await this.hybridDescRepo.findOne(id);
    }

    async update(
        id: number,
        updateHybridDescriptionDto: UpdateHybridDescriptionDto,
    ) {
        const hybridDesc = await this.hybridDescRepo.findOne(id);

        if (!hybridDesc) {
            throw new BadRequestException(
                'Could not find the hybrid description',
            );
        }

        return await this.hybridDescRepo.save({
            id,
            ...updateHybridDescriptionDto,
        });
    }

    remove(id: number) {
        return `This action should remove a #${id} hybridDescription. But it doesn't`;
    }
}
