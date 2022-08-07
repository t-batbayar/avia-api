import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'fs';
import { NotFoundError } from 'rxjs';
import { In, Repository } from 'typeorm';

import { CONFIG_NAME_MAIN } from '../../../config/configuration';
import { createNotFoundMessage } from '../../../libs/createNotFoundMessage';
import { deleteFileByPath, deleteResourceFile } from '../../../libs/deleteFile';
import { CustomerRole } from '../../web/customers/entities/customer-role.entity';
import { Analyst } from '../analysts/entities/analyst.entity';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';
import { Analysis } from './entities/analysis.entity';

@Injectable()
export class AnalysisService {
    constructor(
        @InjectRepository(Analysis)
        private analysisRepository: Repository<Analysis>,

        @InjectRepository(CustomerRole)
        private customerRoleRepository: Repository<CustomerRole>,

        @InjectRepository(Analyst)
        private analystRepository: Repository<Analyst>,

        private configService: ConfigService,
    ) {}

    async create(
        createAnalysisDto: CreateAnalysisDto,
        file: Express.Multer.File,
    ) {
        const analysis = new Analysis();
        analysis.title = createAnalysisDto.title;
        analysis.highlightContent = createAnalysisDto.highlightContent;
        analysis.isFeatured = createAnalysisDto.isFeatured;
        analysis.customerRole = await this.customerRoleRepository.findOne(
            createAnalysisDto.customerRole,
        );
        const analystsIds = createAnalysisDto.analysts
            .split(',')
            .map((id) => +id);
        const analysts = await this.analystRepository.find({
            id: In(analystsIds),
        });
        analysis.analyst = analysts;
        analysis.publishAt = createAnalysisDto.publishAt;
        analysis.expireAt = createAnalysisDto.expireAt;

        if (file) {
            analysis.file = file.filename;
        }

        return await this.analysisRepository.save(analysis).catch((error) => {
            console.log(error);
            if (file) {
                deleteFileByPath(file.path);
            }
        });
    }

    findAll() {
        return this.analysisRepository.find({
            order: {
                id: 'DESC',
            },
        });
    }

    async findOne(id: number) {
        return await this.analysisRepository.findOne(id, {
            relations: ['analyst', 'customerRole'],
        });
    }

    async update(
        id: number,
        updateAnalysisDto: UpdateAnalysisDto,
        file: Express.Multer.File,
    ) {
        const analysis = await this.analysisRepository.findOne(id);

        if (!analysis) {
            throw new NotFoundError(createNotFoundMessage('analysis', id));
        }

        if (analysis.customerRole.id !== updateAnalysisDto.customerRole) {
            const mainConfig = this.configService.get(CONFIG_NAME_MAIN);
            const resourcePath = mainConfig.resourceFolder;

            const newCustomerRole = await this.customerRoleRepository.findOne(
                updateAnalysisDto.customerRole,
            );

            const filePath = `${resourcePath}/${analysis.customerRole.name}/${analysis.file}`;
            const newPath = `${resourcePath}/${newCustomerRole.name}/${analysis.file}`;

            await promises.rename(filePath, newPath);

            analysis.customerRole = newCustomerRole;
        }

        const analystIds = updateAnalysisDto.analysts
            .split(',')
            .map((id) => +id);
        const analysts = await this.analystRepository.find({
            id: In(analystIds),
        });

        analysis.analyst = analysts;

        analysis.title = updateAnalysisDto.title;
        analysis.highlightContent = updateAnalysisDto.highlightContent;
        analysis.isFeatured = updateAnalysisDto.isFeatured;
        analysis.publishAt = updateAnalysisDto.publishAt;
        analysis.expireAt = updateAnalysisDto.expireAt;

        // if (file && analysis.file) {
        //     deleteResourceFile(analysis.file);
        //     analysis.file = file.filename;
        // }

        if (file) {
            analysis.file = file.filename;
        }

        return await this.analysisRepository.save(analysis).catch((error) => {
            console.error(error);
            if (file) {
                deleteFileByPath(file.path);
            }
        });
    }

    async remove(id: number) {
        const analysis = await this.analysisRepository.findOne(id);

        if (!analysis) {
            throw new NotFoundException(createNotFoundMessage('Analysis', id));
        }

        // if (analysis.file) {
        //     deleteResourceFile(analysis.file);
        // }

        return await this.analysisRepository.delete(id);
    }
}
