import {
    ForbiddenException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { createNotFoundMessage } from '../../../libs/createNotFoundMessage';
import { News } from '../../cms/news/entities/news.entity';
import { FrontApiResponse } from '../../common/models/response/front-api.response';
import { RolesHierarchyService } from '../roles-hierarchy/roles-hierarchy.service';

const CUSTOMER_ROLE_ALIAS = 'role';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private newsRepository: Repository<News>,

        @Inject(RolesHierarchyService)
        private rolesHeirarchyService: RolesHierarchyService,
    ) {}

    async getLatestNews() {
        const queryBuilder = this.newsRepository
            .createQueryBuilder('e')
            .leftJoinAndSelect('e.customerRole', CUSTOMER_ROLE_ALIAS)
            .select('e.type, e.publishAt, MAX(e.id) as postId')
            .where(
                'e.publishAt <= :now AND (e.expireAt IS NULL OR e.expireAt > :now)',
                {
                    now: new Date(),
                },
            );

        const customerAllowedRoles =
            await this.rolesHeirarchyService.getCustomerAllowedRoles();

        queryBuilder.andWhere(
            `${CUSTOMER_ROLE_ALIAS}.id in (:customerAllowedId)`,
            { customerAllowedId: customerAllowedRoles },
        );

        const newsWithGroups = await queryBuilder
            .groupBy('e.type, e.publishAt')
            .having('e.publishAt=MAX(e.publishAt)')
            .execute();

        const newsIds = newsWithGroups.map(({ postId }) => postId);

        return await this.newsRepository.find({ where: { id: In(newsIds) } });
    }

    async getRelatedNews(id: number, limit = 10) {
        const news = await this.newsRepository.findOne(id);

        const queryBuilder = this.newsRepository
            .createQueryBuilder('n')
            .leftJoinAndSelect('n.customerRole', CUSTOMER_ROLE_ALIAS)
            .where('n.id != :newsId', { newsId: id })
            .andWhere(
                'n.publishAt <= :now AND (n.expireAt IS NULL OR n.expireAt > :now)',
                {
                    now: new Date(),
                },
            );

        const customerAllowedRoles =
            await this.rolesHeirarchyService.getCustomerAllowedRoles();

        queryBuilder.andWhere(
            `${CUSTOMER_ROLE_ALIAS}.id in (:customerAllowedId)`,
            { customerAllowedId: customerAllowedRoles },
        );

        queryBuilder
            .andWhere('n.type = :type', { type: news.type })
            .orderBy('n.createdAt', 'DESC')
            .limit(limit);

        return queryBuilder.getMany();
    }

    async findAll(type?, page?, perPage?: number, isFeatured?: boolean) {
        const queryBuilder = this.newsRepository
            .createQueryBuilder('n')
            .leftJoinAndSelect('n.customerRole', CUSTOMER_ROLE_ALIAS)
            .andWhere(
                'n.publishAt <= :now AND (n.expireAt IS NULL OR n.expireAt > :now)',
                {
                    now: new Date(),
                },
            );

        const customerAllowedRoles =
            await this.rolesHeirarchyService.getCustomerAllowedRoles();

        queryBuilder.andWhere(
            `${CUSTOMER_ROLE_ALIAS}.id in (:customerAllowedId)`,
            { customerAllowedId: customerAllowedRoles },
        );

        if (type) {
            queryBuilder.andWhere({ type });
        }

        if (page && perPage) {
            queryBuilder.take(perPage);
            queryBuilder.skip((page - 1) * perPage);
        }

        if (isFeatured) {
            queryBuilder.andWhere({ isFeatured });
        }

        queryBuilder.orderBy('n.publishAt', 'DESC');

        return await queryBuilder.getMany();
    }

    async findOne(id: number) {
        const news = await this.newsRepository.findOne(id);

        if (!news) {
            throw new NotFoundException(createNotFoundMessage('News', id));
        }

        const customerAllowedRoles =
            await this.rolesHeirarchyService.getCustomerAllowedRoles();

        if (!customerAllowedRoles.includes(news.customerRole.id)) {
            const response = new FrontApiResponse('fail');
            response.status = 'fail';
            response.result = null;
            response.message = 'Permission denied';
            throw new ForbiddenException(
                response,
                'User has no permission to view this information',
            );
        }

        return news;
    }

    async search(search: string, page: number, perPage = 5) {
        const customerAllowedRoles =
            await this.rolesHeirarchyService.getCustomerAllowedRoles();

        const result = await this.newsRepository
            .createQueryBuilder('n')
            .leftJoinAndSelect('n.customerRole', CUSTOMER_ROLE_ALIAS)
            .andWhere('n.title LIKE :title', { title: `%${search}%` })
            .andWhere(
                'n.publishAt <= :now AND (n.expireAt IS NULL OR n.expireAt > :now)',
                {
                    now: new Date(),
                },
            )
            .andWhere(`${CUSTOMER_ROLE_ALIAS}.id in (:customerAllowedId)`, {
                customerAllowedId: customerAllowedRoles,
            })
            .skip((page - 1) * perPage)
            .getMany();

        return result;
    }
}
