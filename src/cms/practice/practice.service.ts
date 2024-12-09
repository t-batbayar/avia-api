import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { createNotFoundMessage } from '../../../libs/createNotFoundMessage';
import { deleteFile } from '../../../libs/deleteFile';
import { editFilePath } from '../../../libs/editFilePath';
import { MailService } from '../../mail/mail.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { PracticeImages } from './dto/practice-images.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { Practice } from './entities/practice.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class PracticeService {
    constructor(
        @InjectRepository(Practice)
        private practiceRepository: EntityRepository<Practice>,

        @InjectPinoLogger(MailService.name)
        private readonly logger: PinoLogger,

        private em: EntityManager,
    ) {}

    async create(createPracticeDto: CreatePracticeDto, files: PracticeImages) {
        const {
            usegTaviltZurag,
            shalgahZuragNeg,
            shalgahZuragHoyor,
            shalgahZuragGurav,
            shalgahZuragDorov,
        } = files;

        console.log('FILES', files);

        const practice = new Practice();
        practice.useg = createPracticeDto.useg;
        practice.ongo = createPracticeDto.ongo;
        practice.tailbar = createPracticeDto.tailbar;
        practice.solijDuudah = createPracticeDto.solijDuudah;
        practice.orhijDuudah = createPracticeDto.orhijDuudah;
        practice.beltgelUyeNeg = createPracticeDto.beltgelUyeNeg;
        practice.beltgelUyeHoyor = createPracticeDto.beltgelUyeHoyor;
        practice.beltgelUyeGurav = createPracticeDto.beltgelUyeGurav;
        practice.hevshuulehShatNeg = createPracticeDto.hevshuulehShatNeg;
        practice.hevshuulehShatHoyor = createPracticeDto.hevshuulehShatHoyor;
        practice.usegTaviltZurag = usegTaviltZurag
            ? usegTaviltZurag[0].filename
            : null;
        practice.shalgahZuragNeg = shalgahZuragNeg
            ? shalgahZuragNeg[0].filename
            : null;
        practice.shalgahZuragHoyor = shalgahZuragHoyor
            ? shalgahZuragHoyor[0].filename
            : null;
        practice.shalgahZuragGurav = shalgahZuragGurav
            ? shalgahZuragGurav[0].filename
            : null;
        practice.shalgahZuragDorov = shalgahZuragDorov
            ? shalgahZuragDorov[0].filename
            : '';

        console.log('PRACTICE', practice);

        const publishedPractice = await this.practiceRepository
            .upsert(practice)
            .catch((err: any) => {
                try {
                    deleteFile(practice.usegTaviltZurag);
                    deleteFile(practice.shalgahZuragNeg);
                    deleteFile(practice.shalgahZuragHoyor);
                    deleteFile(practice.shalgahZuragGurav);
                    deleteFile(practice.shalgahZuragDorov);
                } catch (error) {}
                throw new Error(err);
            });

        return publishedPractice;
    }

    async findAll(
        type?,
        page?,
        perPage?: number,
        isFeatured?: boolean,
    ): Promise<Practice[]> {
        return await this.practiceRepository.findAll({
            orderBy: {
                order: 'DESC',
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

    async findOne(id: number) {
        const post = await this.practiceRepository.findOne(id);

        if (!post) {
            throw new NotFoundException(createNotFoundMessage('Post', id));
        }

        return post;
    }

    async update(
        id: number,
        updatePostDto: UpdatePracticeDto,
        files: PracticeImages,
    ) {
        const practice = await this.practiceRepository.findOne(id);

        if (!practice) {
            throw new NotFoundException(createNotFoundMessage('practice', id));
        }

        for (const key in files) {
            // Delete if already same file exists
            // if (research[key]) {
            //     deleteResourceFile(research[key]);
            // }

            practice[key] = files[key][0].filename;
        }

        practice.useg = updatePostDto.useg;
        practice.ongo = updatePostDto.ongo;
        practice.tailbar = updatePostDto.tailbar;
        practice.solijDuudah = updatePostDto.solijDuudah;
        practice.orhijDuudah = updatePostDto.orhijDuudah;
        practice.beltgelUyeNeg = updatePostDto.beltgelUyeNeg;
        practice.beltgelUyeHoyor = updatePostDto.beltgelUyeHoyor;
        practice.beltgelUyeGurav = updatePostDto.beltgelUyeGurav;
        practice.hevshuulehShatNeg = updatePostDto.hevshuulehShatNeg;
        practice.hevshuulehShatHoyor = updatePostDto.hevshuulehShatHoyor;

        return await this.practiceRepository.upsert(practice);
    }

    async remove(id: number) {
        const practice = await this.practiceRepository.findOne(id);

        if (!practice) {
            throw new NotFoundException(createNotFoundMessage('practice', id));
        }

        if (practice.usegTaviltZurag) {
            deleteFile(practice.usegTaviltZurag);
        }

        if (practice.shalgahZuragNeg) {
            deleteFile(practice.shalgahZuragNeg);
        }

        if (practice.shalgahZuragHoyor) {
            deleteFile(practice.shalgahZuragHoyor);
        }

        if (practice.shalgahZuragGurav) {
            deleteFile(practice.shalgahZuragGurav);
        }

        if (practice.shalgahZuragDorov) {
            deleteFile(practice.shalgahZuragDorov);
        }

        return await this.em.remove(practice);
    }
}
