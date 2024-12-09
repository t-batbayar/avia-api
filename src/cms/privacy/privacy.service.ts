import { BadRequestException, Injectable } from '@nestjs/common';

import { CreatePrivacyDto } from './dto/create-privacy.dto';
import { UpdatePrivacyDto } from './dto/update-privacy.dto';
import { Privacy } from './entities/privacy.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class PrivacyService {
    constructor(
        @InjectRepository(Privacy)
        private descRepo: EntityRepository<Privacy>,
    ) {}

    async create(createPrivacyDto: CreatePrivacyDto) {
        return await this.descRepo.upsert(createPrivacyDto);
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

    async update(id: number, updatePrivacyDto: UpdatePrivacyDto) {
        const Desc = await this.descRepo.findOne(id);

        if (!Desc) {
            throw new BadRequestException('Could not find the  privacy');
        }

        return await this.descRepo.upsert({
            id,
            ...updatePrivacyDto,
        });
    }

    remove(id: number) {
        return `This action should remove a #${id} Privacy. But it doesn't`;
    }
}
