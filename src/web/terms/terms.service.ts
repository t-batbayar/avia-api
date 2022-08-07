import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Terms } from '../../cms/terms/entities/terms.entity';

@Injectable()
export class TermsService {
    constructor(
        @InjectRepository(Terms)
        private practiceRepo: Repository<Terms>,
    ) {}

    async findOne() {
        return await this.practiceRepo.findOne({
            order: {
                id: 'DESC',
            },
        });
    }
}
