import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SectorMainInfo } from '../../cms/graph-info/entities/sector-main-info.entity';

@Injectable()
export class GraphInfoService {
    constructor(
        @InjectRepository(SectorMainInfo)
        private sectorMainRepo: Repository<SectorMainInfo>,
    ) {}

    async getSectorInfo() {
        return await this.sectorMainRepo.find();
    }
}
