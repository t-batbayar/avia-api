import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';

import { HybridContact } from '../../cms/hybrid-contact/entities/hybrid-contact.entity';
import { HybridDescription } from '../../cms/hybrid-description/entities/hybrid-description.entity';
import { Research } from '../../cms/research/entities/research.entity';
import { ResearchType } from '../../cms/research-type/entities/research-type.entity';
import { cacheKeyResearch } from '../../common/keys/cache/research';
import { RolesHierarchyService } from '../roles-hierarchy/roles-hierarchy.service';
import { HybridMoreResearchDto } from './dto/hybrid-more-research.dto';

@Injectable()
export class HybridService {
    constructor(
        @InjectRepository(HybridDescription)
        private readonly hybridDescRepo: Repository<HybridDescription>,

        @InjectRepository(HybridContact)
        private readonly hybridContactRepo: Repository<HybridContact>,

        @InjectRepository(Research)
        private readonly researchRepo: Repository<Research>,

        @InjectRepository(ResearchType)
        private readonly researchTypeRepo: Repository<ResearchType>,

        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,

        @Inject(RolesHierarchyService)
        private roleHierarchyService: RolesHierarchyService,
    ) {}

    async getDescription() {
        return await this.hybridDescRepo.findOne();
    }

    async getContacts() {
        return await this.hybridContactRepo.find();
    }

    private async getAllResearches(): Promise<ResearchType[]> {
        const cacheData: undefined | ResearchType[] =
            await this.cacheManager.get(cacheKeyResearch.ACTIVE_RESEARCHES);

        let researchTypes = [];
        if (cacheData) {
            researchTypes = cacheData;
        } else {
            const customerAllowedRoles =
                await this.roleHierarchyService.getCustomerAllowedRoles();

            researchTypes = await this.researchTypeRepo
                .createQueryBuilder('rt')
                .leftJoinAndSelect('rt.research', 'r')
                .leftJoinAndSelect('r.customerRole', 'customerRole')
                .where(
                    'r.publish_at < :now AND (r.expire_at IS NULL OR r.expire_at > :now)',
                )
                .andWhere('rt.show = :show')
                .andWhere('customerRole.id in (:customerAllowedRoles)', {
                    customerAllowedRoles: customerAllowedRoles,
                })
                .setParameters({
                    show: true,
                    now: new Date(),
                })
                .orderBy('rt.display_order', 'ASC')
                .getMany();
        }

        await this.cacheManager.set(
            cacheKeyResearch.ACTIVE_RESEARCHES,
            researchTypes,
            { ttl: 300 },
        );

        return researchTypes;
    }

    async getResearches() {
        const researchTypes = await this.getAllResearches();

        const perPage = 10;
        const result = researchTypes.map((researchType) => ({
            ...researchType,
            research: researchType.research.slice(0, perPage),
            totalPages: Math.ceil(researchType.research.length / perPage),
        }));
        return result;
    }

    async getMoreResearches(hybridMoreResearchDto: HybridMoreResearchDto) {
        const perPage = 10;
        const researchTypes = await this.getAllResearches();
        const researchByType = researchTypes.find(
            (research) => research.id === hybridMoreResearchDto.researchIndex,
        );

        return researchByType.research.slice(
            (hybridMoreResearchDto.page - 1) * perPage,
            perPage + perPage,
        );
    }
}
