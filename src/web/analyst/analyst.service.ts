import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Analyst } from '../../cms/analysts/entities/analyst.entity';

@Injectable()
export class AnalystService {
    constructor(
        @InjectRepository(Analyst)
        private analystRepo: Repository<Analyst>,
    ) {}

    async getAnalysts() {
        return await this.analystRepo.find();
    }
}
