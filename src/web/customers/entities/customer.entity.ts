import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { CustomerRole } from './customer-role.entity';

@Entity({ name: 'customer' })
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CustomerRole, (role) => role.customers, { eager: true })
    role: CustomerRole;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'register_number' })
    registerNumber: string;

    @Column({ unique: true })
    @Index()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ name: 'enabled', type: 'bool' })
    enabled = false;

    @Column({ name: 'verify_token', nullable: true, unique: true })
    verifyToken: string;

    @Column({ name: 'verify_token_created_at', nullable: true })
    verifyTokenCreatedAt: Date;

    @Column({ name: 'verify_token_requested_at', nullable: true })
    verifyTokenRequestedAt: Date;

    @Column({ name: 'verify_token_verified_at', nullable: true })
    verifyTokenVerifiedAt: Date;
}
