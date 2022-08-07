import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { News } from '../../../cms/news/entities/news.entity';
import { Research } from '../../../cms/research/entities/research.entity';
import { Customer } from './customer.entity';

export enum CustomerRoleEnum {
    GOLOMT_ADVANCED = 'ROLE_GOLOMT_ADVANCED',
    GOLOMT_BASE = 'ROLE_GOLOMT_BASE',
    USER_PAID = 'ROLE_USER_PAID',
    USER_FREE = 'ROLE_USER_FREE',
    USER_GUEST = 'ROLE_USER_GUEST',
}

@Entity({ name: 'customer_role' })
export class CustomerRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: CustomerRoleEnum;

    @Column()
    priority: number;

    @OneToMany(() => Customer, (customer) => customer.role)
    customers: Customer[];

    @OneToMany(() => Research, (research) => research.customerRole)
    research: Research[];

    @OneToMany(() => News, (news) => news.customerRole)
    news: News[];
}
