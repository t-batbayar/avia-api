import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Privacy } from '../../cms/privacy/entities/privacy.entity';

@Injectable()
export class PrivacyService {
    constructor(
        @InjectRepository(Privacy)
        private privacyRepo: Repository<Privacy>,
    ) {}

    async findOne() {
        return await this.privacyRepo.findOne({
            order: {
                id: 'DESC',
            },
        });
    }
}
