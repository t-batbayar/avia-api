import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Practice } from '../../practice/entities/practice.entity';

@Entity()
export class SubPractice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ner: string;

    @Column({ nullable: true })
    argachlal: string;

    @Column({ nullable: true })
    zorilgo: string;

    @Column()
    tailbar: string;

    @Column()
    shuleg: string;

    @Column()
    thumbnail: string;

    @Column()
    video: string;

    @ManyToOne(() => Practice, (practice) => practice.dasgaluud)
    @JoinColumn()
    practice: Practice;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
