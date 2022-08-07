import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Practice } from '../../cms/practice/entities/practice.entity';

@Injectable()
export class PracticeService {
    constructor(
        @InjectRepository(Practice)
        private practiceRepo: Repository<Practice>,
    ) {}

    async findAll() {
        return await this.practiceRepo.find({
            order: {
                id: 'ASC',
            },
        });
    }
}
