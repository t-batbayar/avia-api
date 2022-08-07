import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createNotFoundMessage } from '../../../libs/createNotFoundMessage';
import { deleteFile } from '../../../libs/deleteFile';
import { editFilePath } from '../../../libs/editFilePath';
import { CreateAnalystDto } from './dto/create-analyst.dto';
import { UpdateAnalystDto } from './dto/update-analyst.dto';
import { Analyst } from './entities/analyst.entity';

@Injectable()
export class AnalystsService {
    constructor(
        @InjectRepository(Analyst)
        private analystRepository: Repository<Analyst>,
    ) {}

    async create(
        createAnalystDto: CreateAnalystDto,
        file: Express.Multer.File,
    ) {
        const analyst = new Analyst();
        analyst.name = createAnalystDto.name;
        analyst.email = createAnalystDto.email;
        analyst.position = createAnalystDto.position;
        analyst.bio = createAnalystDto.bio;

        if (file) {
            analyst.imagePath = editFilePath(file.path);
        }

        return await this.analystRepository.save(analyst);
    }

    findAll(): Promise<Analyst[]> {
        return this.analystRepository.find({
            order: {
                id: 'DESC',
            },
        });
    }

    async findOne(id: number) {
        const analyst = await this.analystRepository.findOne(id);

        if (!analyst) {
            throw new NotFoundException(createNotFoundMessage('Analyst', id));
        }

        return analyst;
    }

    async update(id: number, updateAnalystDto: UpdateAnalystDto, file) {
        const analyst = await this.analystRepository.findOne(id);

        if (!analyst) {
            throw new NotFoundException(createNotFoundMessage('Analyst', id));
        }

        analyst.name = updateAnalystDto.name;
        analyst.email = updateAnalystDto.email;
        analyst.position = updateAnalystDto.position;
        analyst.bio = updateAnalystDto.bio;

        if (file) {
            deleteFile(analyst.imagePath);
            analyst.imagePath = editFilePath(file.path);
        }

        return await this.analystRepository.save(analyst);
    }

    async remove(id: number) {
        const analyst = await this.analystRepository.findOne(id);

        if (!analyst) {
            throw new NotFoundException(createNotFoundMessage('Analyst', id));
        }

        if (analyst.imagePath) {
            deleteFile(analyst.imagePath);
        }

        return await this.analystRepository.delete(id);
    }
}
