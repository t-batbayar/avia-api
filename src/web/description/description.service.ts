import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Description } from '../../cms/description/entities/description.entity';

@Injectable()
export class DescriptionService {
    constructor(
        @InjectRepository(Description)
        private DescRepo: Repository<Description>,
    ) {}

    async findAll() {
        return await this.DescRepo.find({
            order: {
                order: 'ASC',
            },
        });
    }
}
