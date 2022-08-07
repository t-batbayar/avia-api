import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { createNotFoundMessage } from '../../../libs/createNotFoundMessage';
import { deleteFile } from '../../../libs/deleteFile';
import { editFilePath } from '../../../libs/editFilePath';
import { MailService } from '../../mail/mail.service';
import { CustomerRole } from '../../web/customers/entities/customer-role.entity';
import { MailServiceService } from '../mail-service/mail-service.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private newsRepository: Repository<News>,

        @InjectRepository(CustomerRole)
        private customerRoleRepository: Repository<CustomerRole>,

        @Inject(MailServiceService)
        private mailService: MailServiceService,

        @InjectPinoLogger(MailService.name)
        private readonly logger: PinoLogger,
    ) {}

    async create(createNewsDto: CreateNewsDto, file: Express.Multer.File) {
        const news = new News();
        news.title = createNewsDto.title;
        news.description = createNewsDto.description;
        news.body = createNewsDto.body;
        news.type = createNewsDto.type;
        news.isFeatured = createNewsDto.isFeatured;
        news.publishAt = createNewsDto.publishAt;
        news.expireAt = createNewsDto.expireAt;

        const role = await this.customerRoleRepository.findOne(
            createNewsDto.customerRole,
        );

        news.customerRole = role;

        if (file) {
            news.imgUrl = editFilePath(file.path);
        }

        const publishedNews = await this.newsRepository
            .save(news)
            .catch((err: any) => {
                deleteFile(news.imgUrl);
                throw new Error(err);
            });

        // this.mailService.sendMail(role, publishedNews).catch((error) => {
        //     this.logger.error(`Error message: ${error.message}`, {
        //         stack: error.stack,
        //     });
        // });

        return publishedNews;
    }

    async findAll(
        type?,
        page?,
        perPage?: number,
        isFeatured?: boolean,
    ): Promise<News[]> {
        return await this.newsRepository.find({
            select: [
                'id',
                'title',
                'description',
                'type',
                'isFeatured',
                'imgUrl',
                'publishAt',
                'expireAt',
            ],
            order: {
                id: 'DESC',
                publishAt: 'DESC',
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
        const post = await this.newsRepository.findOne(id);

        if (!post) {
            throw new NotFoundException(createNotFoundMessage('Post', id));
        }

        return post;
    }

    async update(
        id: number,
        updatePostDto: UpdateNewsDto,
        file: Express.Multer.File,
    ) {
        const news = await this.newsRepository.findOne(id);

        if (!news) {
            throw new NotFoundException(createNotFoundMessage('news', id));
        }

        news.customerRole = await this.customerRoleRepository.findOne(
            updatePostDto.customerRole,
        );

        news.title = updatePostDto.title;
        news.description = updatePostDto.description;
        news.body = updatePostDto.body;
        news.type = updatePostDto.type;
        news.isFeatured = updatePostDto.isFeatured;
        news.publishAt = updatePostDto.publishAt;
        news.expireAt = updatePostDto.expireAt;

        if (file) {
            deleteFile(news.imgUrl);
            news.imgUrl = editFilePath(file.path);
        }

        return await this.newsRepository.save(news);
    }

    async remove(id: number) {
        const news = await this.newsRepository.findOne(id);

        if (!news) {
            throw new NotFoundException(createNotFoundMessage('news', id));
        }

        if (news.imgUrl) {
            deleteFile(news.imgUrl);
        }

        return await this.newsRepository.delete(id);
    }
}
