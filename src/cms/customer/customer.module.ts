import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from '../../web/customers/entities/customer.entity';
import { CustomerRole } from '../../web/customers/entities/customer-role.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
    imports: [TypeOrmModule.forFeature([Customer, CustomerRole])],
    controllers: [CustomerController],
    providers: [CustomerService],
})
export class CustomerModule {}
