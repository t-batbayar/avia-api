import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Research } from '../research/entities/research.entity';
import { CreateResearchTypeDto } from './dto/create-research-type.dto';
import { UpdateResearchTypeDto } from './dto/update-research-type.dto';
import { ResearchType } from './entities/research-type.entity';

@Injectable()
export class ResearchTypeService {
    constructor(
        @InjectRepository(Research)
        private researchRepo: Repository<Research>,

        @InjectRepository(ResearchType)
        private analysisType: Repository<ResearchType>,
    ) {}

    create(createResearchTypeDto: CreateResearchTypeDto) {
        return this.analysisType.save(createResearchTypeDto);
    }

    findAll() {
        return this.analysisType.find({
            order: {
                displayOrder: 'ASC',
            },
        });
    }

    async findOne(id: number) {
        const analysisType = await this.analysisType.findOne(id);

        delete analysisType.research;

        return analysisType;
    }

    update(id: number, updateResearchTypeDto: UpdateResearchTypeDto) {
        return this.analysisType.save({
            id,
            ...updateResearchTypeDto,
        });
    }

    async remove(id: number) {
        const researchesWithType = await this.researchRepo.find({
            where: {
                researchType: {
                    id,
                },
            },
            relations: ['researchType'],
        });

        const researchesWithoutType = researchesWithType.map((research) => {
            research.researchType = null;
            return research;
        });

        await this.researchRepo.save(researchesWithoutType);

        return this.analysisType.delete(id);
    }
}
