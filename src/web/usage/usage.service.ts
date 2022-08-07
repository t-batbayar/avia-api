import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usage } from '../../cms/usage/entities/usage.entity';

@Injectable()
export class UsageService {
    constructor(
        @InjectRepository(Usage)
        private usageRepo: Repository<Usage>,
    ) {}

    async findOne() {
        return await this.usageRepo.findOne({
            order: {
                id: 'DESC',
            },
        });
    }
}
