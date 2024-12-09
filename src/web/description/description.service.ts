import { Injectable } from '@nestjs/common';

import { Description } from '../../cms/description/entities/description.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class DescriptionService {
    constructor(
        @InjectRepository(Description)
        private DescRepo: EntityRepository<Description>,
    ) {}

    async findAll() {
        return await this.DescRepo.findAll({
            orderBy: {
                order: 'ASC',
            },
        });
    }
}
