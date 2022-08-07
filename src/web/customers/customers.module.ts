import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from '../../mail/mail.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.entity';
import { CustomerRole } from './entities/customer-role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Customer, CustomerRole]), MailModule],
    controllers: [CustomersController],
    providers: [CustomersService],
})
export class CustomersModule {}
