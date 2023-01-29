import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { createNotFoundMessage } from '../../../libs/createNotFoundMessage';
import { deleteFile } from '../../../libs/deleteFile';
import { editFilePath } from '../../../libs/editFilePath';
import { MailService } from '../../mail/mail.service';
import { Practice } from '../practice/entities/practice.entity';
import { CreateSubPracticeDto } from './dto/create-sub-practice.dto';
import { SubPracticeFiles } from './dto/sub-practice-files.dto';
import { UpdateSubPracticeDto } from './dto/update-sub-practice.dto';
import { SubPractice } from './entities/sub-practice.entity';

@Injectable()
export class SubPracticeService {
    constructor(
        @InjectRepository(SubPractice)
        private subPracticeRepository: Repository<SubPractice>,

        @InjectRepository(Practice)
        private practiceRepository: Repository<Practice>,

        @InjectPinoLogger(MailService.name)
        private readonly logger: PinoLogger,
    ) {}

    async create(
        id: number,
        createSubPracticeDto: CreateSubPracticeDto,
        files: SubPracticeFiles,
    ) {
        const { thumbnail, video } = files;

        const subPractice = new SubPractice();
        subPractice.ner = createSubPracticeDto.ner;
        subPractice.argachlal = createSubPracticeDto.argachlal;
        subPractice.tailbar = createSubPracticeDto.tailbar;
        subPractice.shuleg = createSubPracticeDto.shuleg;
        subPractice.zorilgo = createSubPracticeDto.zorilgo;
        subPractice.thumbnail = thumbnail ? thumbnail[0].filename : null;
        subPractice.video = video ? video[0].filename : null;

        const practice = await this.practiceRepository.findOne(id);

        if (!practice) {
            throw new Error(`Couldn't find the practice with the id: ${id}`);
        }

        subPractice.practice = practice;
        // subPractice.shalgahZuragHoyor = shalgahZuragHoyor
        //     ? shalgahZuragHoyor[0].filename
        //     : null;
        // subPractice.shalgahZuragGurav = shalgahZuragGurav
        //     ? shalgahZuragGurav[0].filename
        //     : null;
        // subPractice.shalgahZuragDorov = shalgahZuragDorov
        //     ? shalgahZuragDorov[0].filename
        //     : '';

        const publishedSubPractice = await this.subPracticeRepository
            .save(subPractice)
            .catch((err: any) => {
                try {
                    deleteFile(subPractice.thumbnail);
                    deleteFile(subPractice.video);
                } catch (error) {}
                throw new Error(err);
            });

        return publishedSubPractice;
    }

    async findAll(id: number): Promise<SubPractice[]> {
        return await this.subPracticeRepository.find({
            practice: {
                id: id,
            },
        });

        // if (type) {
        //     queryBuilder.andWhere({ type });
        // }

        // if (page && perPage) {
        //     queryBuilder.take(perPage);
        //     queryBuilder.skip((page - 1) * perPage);
        // }

        // if (isFeatured) {
        //     queryBuilder.andWhere({ isFeatured });
        // }

        // return await queryBuilder.getMany();
    }

    async findOne(sid: number) {
        const post = await this.subPracticeRepository.findOne(sid);

        if (!post) {
            throw new NotFoundException(createNotFoundMessage('Post', sid));
        }

        return post;
    }

    async update(
        sid: number,
        updatePostDto: UpdateSubPracticeDto,
        files: SubPracticeFiles,
    ) {
        const subPractice = await this.subPracticeRepository.findOne(sid);

        if (!subPractice) {
            throw new NotFoundException(
                createNotFoundMessage('subPractice', sid),
            );
        }

        // if (subPractice.thumbnail) {
        //     try {
        //         deleteFile(subPractice.thumbnail);
        //     } catch (error) {
        //         console.log(error.message);
        //     }
        // }

        // if (subPractice.video) {
        //     try {
        //         deleteFile(subPractice.video);
        //     } catch (error) {
        //         console.log(error.message);
        //     }
        // }

        for (const key in files) {
            // Delete if already same file exists
            // if (research[key]) {
            //     deleteResourceFile(research[key]);
            // }

            subPractice[key] = files[key][0].filename;
        }

        subPractice.ner = updatePostDto.ner;
        subPractice.argachlal = updatePostDto.argachlal;
        subPractice.zorilgo = updatePostDto.zorilgo;
        subPractice.tailbar = updatePostDto.tailbar;
        subPractice.shuleg = updatePostDto.shuleg;
        return await this.subPracticeRepository.save(subPractice);
    }

    async remove(sid: number) {
        const subPractice = await this.subPracticeRepository.findOne(sid);

        if (!subPractice) {
            throw new NotFoundException(
                createNotFoundMessage('subPractice', sid),
            );
        }

        if (subPractice.thumbnail) {
            deleteFile(subPractice.thumbnail);
        }

        if (subPractice.video) {
            deleteFile(subPractice.video);
        }

        return await this.subPracticeRepository.delete(sid);
    }
}
