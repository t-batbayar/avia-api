import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerRole } from '../../web/customers/entities/customer-role.entity';

@Injectable()
export class CmsCustomerRoleService {
    constructor(
        @InjectRepository(CustomerRole)
        private customerRoleRepo: Repository<CustomerRole>,
    ) {}

    async getAll() {
        return await this.customerRoleRepo.find();
    }
}
