import { Injectable } from '@nestjs/common';

import { Privacy } from '../../cms/privacy/entities/privacy.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class PrivacyService {
    constructor(
        @InjectRepository(Privacy)
        private privacyRepo: EntityRepository<Privacy>,
    ) {}

    async findOne() {
        return await this.privacyRepo.findOne({});
    }
}
