import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { UpdateCmsPermissionDto } from './dto/update-cms-permission.dto';
import { CmsPermission } from './entities/cms-permission.entity';

@Injectable()
export class CmsPermissionService {
    constructor(
        @InjectRepository(CmsPermission)
        private repo: Repository<CmsPermission>,
    ) {}

    async findAll() {
        return await this.repo.find({
            where: {
                cmsRoles: Not('ADMIN'),
            },
        });
    }

    async findOne(id: number) {
        return await this.repo.findOne(id);
    }

    async update(id: number, updateCmsPermissionDto: UpdateCmsPermissionDto) {
        const permission = await this.repo.findOne(id);

        if (!permission) {
            throw new NotFoundException(
                `Couldn't find the permission with the id: ${id}`,
            );
        }

        permission.allowedRoles = updateCmsPermissionDto.allowedRoles;

        return await this.repo.save(permission);
    }
}
