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
import { ResearchType } from '../../research-type/entities/research-type.entity';

@Entity({ name: 'research' })
export class Research {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        name: 'file_xlsx',
        nullable: true,
    })
    fileXlsx: string;

    @Column({
        name: 'file_pdf',
        nullable: true,
    })
    filePdf: string;

    @Column({
        name: 'file_word',
        nullable: true,
    })
    fileWord: string;

    @Column({
        name: 'file_ppt',
        nullable: true,
    })
    filePpt: string;

    @Column({
        name: 'file_jpg',
        nullable: true,
    })
    fileJpg: string;

    @Column({
        name: 'file_mp3',
        nullable: true,
    })
    fileMp3: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ name: 'publish_at', type: 'datetime', nullable: true })
    publishAt: Date;

    @Column({ name: 'expire_at', type: 'datetime', nullable: true })
    expireAt: Date;

    @ManyToMany(() => Analyst, { nullable: true })
    @JoinTable()
    analyst: Analyst[];

    @ManyToOne(() => ResearchType, (researchType) => researchType.research, {
        nullable: true,
    })
    @JoinColumn({ name: 'researchTypeId' })
    researchType: ResearchType;

    @ManyToOne(() => CustomerRole, (role) => role.customers, { eager: true })
    @JoinColumn()
    customerRole: CustomerRole;
}
