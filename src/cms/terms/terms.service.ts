import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateTermsDto } from './dto/create-terms.dto';
import { UpdateTermsDto } from './dto/update-terms.dto';
import { Terms } from './entities/terms.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class TermsService {
    constructor(
        @InjectRepository(Terms)
        private DescRepo: EntityRepository<Terms>,
    ) {}

    async create(createTermsDto: CreateTermsDto) {
        return await this.DescRepo.insert(createTermsDto);
    }

    async findAll() {
        return await this.DescRepo.findAll({
            orderBy: {
                id: 'DESC',
            },
        });
    }

    async findOne(id: number) {
        return await this.DescRepo.findOne(id);
    }

    async update(id: number, updateTermsDto: UpdateTermsDto) {
        const Desc = await this.DescRepo.findOne(id);

        if (!Desc) {
            throw new BadRequestException('Could not find the  terms');
        }

        return await this.DescRepo.upsert({
            id,
            ...updateTermsDto,
        });
    }

    remove(id: number) {
        return `This action should remove a #${id} Terms. But it doesn't`;
    }
}
