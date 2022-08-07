import {
    CACHE_MANAGER,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import * as fs from 'fs';
import { Repository } from 'typeorm';

import { CONFIG_NAME_MAIN } from '../../../config/configuration';
import { createNotFoundMessage } from '../../../libs/createNotFoundMessage';
import { deleteFileByPath } from '../../../libs/deleteFile';
import { getResourcePath } from '../../../libs/getResourcePath';
import { cacheKeyResearch } from '../../common/keys/cache/research';
import { CustomerRole } from '../../web/customers/entities/customer-role.entity';
import { ResearchType } from '../research-type/entities/research-type.entity';
import { CreateResearchDto } from './dto/create-research.dto';
import { ResearchFiles } from './dto/research-files.dto';
import { UpdateResearchDto } from './dto/update-research.dto';
import { Research } from './entities/research.entity';

@Injectable()
export class ResearchService {
    constructor(
        @InjectRepository(Research)
        private researchRepository: Repository<Research>,

        @InjectRepository(ResearchType)
        private researchTypeRepository: Repository<ResearchType>,

        @InjectRepository(CustomerRole)
        private customerRolesRepository: Repository<CustomerRole>,

        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,

        private readonly configService: ConfigService,
    ) {}

    async create(createResearchDto: CreateResearchDto, files: ResearchFiles) {
        const { fileJpg, fileMp3, filePdf, filePpt, fileWord, fileXlsx } =
            files;

        const research = new Research();

        research.fileJpg = fileJpg ? fileJpg[0].filename : null;
        research.fileMp3 = fileMp3 ? fileMp3[0].filename : null;
        research.filePdf = filePdf ? filePdf[0].filename : null;
        research.filePpt = filePpt ? filePpt[0].filename : null;
        research.fileWord = fileWord ? fileWord[0].filename : null;
        research.fileXlsx = fileXlsx ? fileXlsx[0].filename : null;

        research.researchType = await this.researchTypeRepository.findOne(
            createResearchDto.researchType,
        );

        research.customerRole = await this.customerRolesRepository.findOne(
            createResearchDto.customerRole,
        );

        research.name = createResearchDto.name;
        research.publishAt = createResearchDto.publishAt;
        research.expireAt = createResearchDto.expireAt
            ? createResearchDto.expireAt
            : null;

        this.deleteCache();

        return await this.researchRepository.save(research).catch((error) => {
            console.error(error);
            for (const key in files) {
                const filesArr = files[key];
                const file = filesArr[0] as Express.Multer.File;
                deleteFileByPath(file.path);
            }
        });
    }

    async getAll() {
        return await this.researchRepository.find();
    }

    async findAll(page = 1, perPage = 10, title: string, type: string) {
        return await this.researchRepository.find({
            order: {
                id: 'DESC',
            },
        });

        // const queryBuilder = this.researchRepository
        //     .createQueryBuilder('a')
        //     .where('a.publishAt <= :now')
        //     .andWhere('a.expireAt IS NULL OR a.expireAt >= :now')
        //     .setParameters({
        //         now: new Date(),
        //     })
        //     .orderBy('a.publishAt', 'DESC')
        //     .take(perPage)
        //     .skip((page - 1) * perPage);

        // if (title) {
        //     queryBuilder
        //         .andWhere('a.title LIKE "%:title%"')
        //         .setParameters({ title });
        // }

        // if (type) {
        //     queryBuilder
        //         .andWhere('a.type LIKE "%:type%"')
        //         .setParameters({ type });
        // }

        // return await queryBuilder.getMany();
    }

    async findOne(id: number) {
        const research = await this.researchRepository
            .createQueryBuilder('r')
            .leftJoinAndSelect('r.researchType', 'rt')
            .leftJoinAndSelect('r.customerRole', 'cr')
            .where('r.id = :id', { id })
            .getOne();

        if (!research) {
            throw new NotFoundException(createNotFoundMessage('Research', id));
        }

        return research;
    }

    async update(
        id: number,
        updateAnalysisDto: UpdateResearchDto,
        files: ResearchFiles,
    ) {
        const research = await this.researchRepository.findOne(id);

        if (!research) {
            throw new NotFoundException(`Research with id ${id} not found!`);
        }

        for (const key in files) {
            // Delete if already same file exists
            // if (research[key]) {
            //     deleteResourceFile(research[key]);
            // }

            research[key] = files[key][0].filename;
        }

        research.researchType = await this.researchTypeRepository.findOne(
            updateAnalysisDto.researchType,
        );

        if (research.customerRole.id !== updateAnalysisDto.customerRole) {
            const mainConfig = this.configService.get(CONFIG_NAME_MAIN);
            const resourcePath = mainConfig.resourceFolder;

            const newCustomerRole = await this.customerRolesRepository.findOne(
                updateAnalysisDto.customerRole,
            );

            const currentPathPrefix = `${resourcePath}/${research.customerRole.name}/`;
            const newPathPrefix = `${resourcePath}/${newCustomerRole.name}/`;
            const filesToMove = {
                fileXlsx: {
                    currentPath: `${currentPathPrefix}${research.fileXlsx}`,
                    newPath: `${newPathPrefix}${research.fileXlsx}`,
                },
                filePdf: {
                    currentPath: `${currentPathPrefix}${research.filePdf}`,
                    newPath: `${newPathPrefix}${research.filePdf}`,
                },
                fileWord: {
                    currentPath: `${currentPathPrefix}${research.fileWord}`,
                    newPath: `${newPathPrefix}${research.fileWord}`,
                },
                filePpt: {
                    currentPath: `${currentPathPrefix}${research.filePpt}`,
                    newPath: `${newPathPrefix}${research.filePpt}`,
                },
                fileJpg: {
                    currentPath: `${currentPathPrefix}${research.fileJpg}`,
                    newPath: `${newPathPrefix}${research.fileJpg}`,
                },
                fileMp3: {
                    currentPath: `${currentPathPrefix}${research.fileMp3}`,
                    newPath: `${newPathPrefix}${research.fileMp3}`,
                },
            };

            const fsPromise = fs.promises;
            for (const key in filesToMove) {
                try {
                    await fsPromise.rename(
                        filesToMove[key].currentPath,
                        filesToMove[key].newPath,
                    );
                } catch (error) {
                    console.log(error);
                }
            }
            research.customerRole = newCustomerRole;
        }

        research.name = updateAnalysisDto.name;
        research.publishAt = updateAnalysisDto.publishAt;
        research.expireAt = updateAnalysisDto.expireAt
            ? updateAnalysisDto.expireAt
            : null;

        this.deleteCache();

        return await this.researchRepository.save(research).catch((error) => {
            console.error(error);
            for (const key in files) {
                const filesArr = files[key];
                const file = filesArr[0] as Express.Multer.File;
                deleteFileByPath(file.path);
            }
        });
    }

    async remove(id: number) {
        const research = await this.researchRepository.findOne(id);

        if (!research) {
            throw new NotFoundException(createNotFoundMessage('Research', id));
        }

        this.deleteCache();

        return await this.researchRepository.delete(id);
    }

    async getResourceFile(filename: string): Promise<any> {
        try {
            const filePath = await getResourcePath(filename);
            return fs.createReadStream(filePath);
        } catch (error) {
            console.error(error);
            throw new HttpException(
                `Sorry there was an error while trying to find the file ${filename}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    private async deleteCache(): Promise<void> {
        await this.cacheManager.del(cacheKeyResearch.ACTIVE_RESEARCHES);
    }
}
