import { Injectable } from '@nestjs/common';

import { Usage } from '../../cms/usage/entities/usage.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class UsageService {
    constructor(
        @InjectRepository(Usage)
        private usageRepo: EntityRepository<Usage>,
    ) {}

    async findOne() {
        return await this.usageRepo.findOne({});
    }
}
