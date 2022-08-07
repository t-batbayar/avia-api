import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { In, Repository } from 'typeorm';

import {
    CustomerRole,
    CustomerRoleEnum,
} from '../customers/entities/customer-role.entity';

@Injectable()
export class RolesHierarchyService {
    constructor(
        @InjectRepository(CustomerRole)
        private customerRoleRepository: Repository<CustomerRole>,

        @Inject(REQUEST)
        private request: Request,
    ) {}

    public getRequestRole() {
        let requestRole = this.request.headers['user-role'] as
            | string
            | undefined;

        if (!requestRole) {
            requestRole = CustomerRoleEnum.USER_FREE;
        }

        return requestRole;
    }

    public async userAllowedToSeeRoles() {
        const allowedToSeeRoles = [
            CustomerRoleEnum.USER_GUEST,
            CustomerRoleEnum.USER_FREE,
            CustomerRoleEnum.USER_PAID,
        ];

        const result = await this.customerRoleRepository.find({
            select: ['id'],
            where: {
                name: In(allowedToSeeRoles),
            },
        });

        return result.map((role) => role.id);
    }

    public async getCustomerAllowedRoles() {
        const requestRole = this.getRequestRole();
        const allRoles = await this.customerRoleRepository.find();
        const currentRole = allRoles.find((role) => role.name === requestRole);

        return allRoles
            .filter((role) => role.priority <= currentRole.priority)
            .map((role) => role.id);
    }
}
