import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { CustomerRole } from '../../../web/customers/entities/customer-role.entity';

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    @Index()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true, type: 'longtext' })
    body: string;

    @Column({ name: 'img_url', nullable: true })
    imgUrl: string;

    @Column({ name: 'is_featured', nullable: true, default: false })
    isFeatured: boolean;

    @Column({ nullable: true })
    @Index()
    type: string;

    @Column({ name: 'publish_at' })
    publishAt: Date;

    @Column({ name: 'expire_at', nullable: true })
    expireAt: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => CustomerRole, (role) => role.customers, { eager: true })
    @JoinColumn()
    customerRole: CustomerRole;
}
