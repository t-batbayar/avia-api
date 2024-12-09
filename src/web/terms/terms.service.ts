import { Injectable } from '@nestjs/common';

import { Terms } from '../../cms/terms/entities/terms.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class TermsService {
    constructor(
        @InjectRepository(Terms)
        private termsRepo: EntityRepository<Terms>,
    ) {}

    async findOne() {
        return await this.termsRepo.findOne({});
    }
}
