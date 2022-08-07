import { IsOptional } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { CustomerRole } from '../../../web/customers/entities/customer-role.entity';
import { Analyst } from '../../analysts/entities/analyst.entity';

@Entity({ name: 'analysis' })
export class Analysis {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ name: 'highlight_content', type: 'text', nullable: true })
    highlightContent: string;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true, type: 'varchar' })
    contentType = 'Макро';

    @Column({ nullable: true })
    contentLink: string;

    @Column({ nullable: true })
    contentLinkTarget: string;

    @Column({ nullable: true })
    contentHtml: string;

    @Column({ nullable: true, type: 'boolean', default: false })
    isFeatured: boolean;

    @Column({ nullable: true, type: 'boolean' })
    isPublished: false;

    @Column({ nullable: true, type: 'boolean' })
    isPublic: false;

    @Column({ nullable: true, type: 'varchar' })
    file: string;

    @Column({ name: 'file_type', nullable: true, type: 'varchar' })
    fileType: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    publishAt: Date;

    @Column({ nullable: true })
    @IsOptional()
    expireAt: Date;

    @ManyToMany(() => Analyst, {
        nullable: true,
    })
    @JoinTable()
    analyst: Analyst[];

    @ManyToOne(() => CustomerRole, (role) => role.customers, { eager: true })
    @JoinColumn()
    customerRole: CustomerRole;
}
