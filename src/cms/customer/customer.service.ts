import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../../web/customers/entities/customer.entity';
import { CustomerRole } from '../../web/customers/entities/customer-role.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepo: Repository<Customer>,

        @InjectRepository(CustomerRole)
        private customerRoleRepo: Repository<CustomerRole>,
    ) {}

    async findAll() {
        return await this.customerRepo.find({
            order: {
                id: 'DESC',
            },
        });
    }

    async findOne(id: number) {
        const customer = await this.customerRepo.findOne(id);

        if (!customer) {
            throw new NotFoundException(
                `Couldn't find the customer with the id: ${id}`,
            );
        }

        const {
            password: _password,
            createdAt: _createdAt,
            updatedAt: _updatedAt,
            verifyToken: _verifyToken,
            verifyTokenCreatedAt: _verifyTokenCreatedAt,
            verifyTokenRequestedAt: _verifyTokenRequestedAt,
            verifyTokenVerifiedAt: _verifyTokenVerifiedAt,
            ...restCustomer
        } = customer;

        return restCustomer;
    }

    async update(id: number, updateCustomerDto: UpdateCustomerDto) {
        const customer = await this.customerRepo.findOne(id);

        const customerRole = await this.customerRoleRepo.findOne(
            updateCustomerDto.role,
        );

        customer.role = customerRole;

        return this.customerRepo.save(customer);
    }

    async remove(id: number) {
        return await this.customerRepo.delete(id);
    }
}
