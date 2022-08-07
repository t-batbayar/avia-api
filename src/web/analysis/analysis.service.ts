import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { mn } from 'date-fns/locale';
import { In, LessThan, MoreThan, Repository } from 'typeorm';

import { Analysis } from '../../cms/analysis/entities/analysis.entity';
import { RolesHierarchyService } from '../roles-hierarchy/roles-hierarchy.service';

@Injectable()
export class AnalysisService {
    constructor(
        @InjectRepository(Analysis)
        private analysisRepository: Repository<Analysis>,

        @Inject(RolesHierarchyService)
        private roleHierarchyService: RolesHierarchyService,
    ) {}

    async getFeatured() {
        const customerAllowedRoles =
            await this.roleHierarchyService.getCustomerAllowedRoles();

        // const highlighted = await this.analysisRepository.findOne({
        //     where: {
        //         isFeatured: true,
        //         customerRole: {
        //             id: In(customerAllowedRoles),
        //         },
        //     },
        //     order: {
        //         publishAt: 'DESC',
        //     },
        //     relations: ['analyst', 'customerRole'],
        // });

        const currentDateObj = this.getCurrentDateObj();

        const result = [];

        const highlightedQb = await this.analysisRepository
            .createQueryBuilder('a')
            .where('a.isFeatured = :isFeatured', { isFeatured: true })
            .leftJoinAndSelect('a.analyst', 'analyst')
            .leftJoinAndSelect('a.customerRole', 'customerRole')
            .andWhere('a.customerRole IN(:allowedRoles)', {
                allowedRoles: customerAllowedRoles,
            })
            .andWhere(
                'a.publishAt <= :now AND (a.expireAt IS NULL OR a.expireAt > :now)',
                {
                    now: currentDateObj,
                },
            )
            .orderBy('a.publishAt', 'DESC')
            .getOne();

        if (highlightedQb) {
            result.push(highlightedQb);
        }

        return result;
    }

    async getThumbList(page: number, take = 3) {
        const customerAllowedRoles =
            await this.roleHierarchyService.getCustomerAllowedRoles();

        const userAllowedToSeeRoles =
            await this.roleHierarchyService.userAllowedToSeeRoles();

        const mergedRoles = customerAllowedRoles.concat(
            userAllowedToSeeRoles.filter(
                (ele) => !customerAllowedRoles.includes(ele),
            ),
        );

        const featuredAnalysis = await this.getFeatured();
        const currentDateObj = this.getCurrentDateObj();

        const qb = this.analysisRepository
            .createQueryBuilder('a')
            .leftJoin('a.analyst', 'analyst')
            .leftJoin('a.customerRole', 'customerRole')
            .addSelect('customerRole.name')
            .addSelect('customerRole.id')
            .addSelect('analyst.name')
            .addSelect('analyst.email')
            .addSelect('analyst.position')
            .andWhere('customerRole.id IN(:allowedRoles)', {
                allowedRoles: mergedRoles,
            })
            .andWhere(
                'a.publishAt <= :now AND (a.expireAt IS NULL OR a.expireAt > :now)',
                {
                    now: currentDateObj,
                },
            )
            .orderBy('a.publishAt', 'DESC')
            .take(take)
            .skip((page - 1) * take);

        let analysis = await qb.getMany();

        if (featuredAnalysis.length && featuredAnalysis[0]) {
            analysis = analysis.filter(
                (analyse) => featuredAnalysis[0].id !== analyse.id,
            );
        }

        return analysis;
    }

    private getCurrentDateObj() {
        const currentDate = format(new Date(), 'yyyy-MM-dd  HH:mm:ss.SSSSSS', {
            locale: mn,
        });

        const currentDateObj = new Date(currentDate);

        return currentDateObj;
    }
}
