import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { SubPractice } from '../../sub-practice/entities/sub-practice.entity';

@Entity()
export class Practice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    useg: string;

    @Column({ nullable: true })
    ongo: string;

    @Column({ nullable: true, type: 'int' })
    order: number;

    @Column({ nullable: true })
    tailbar: string;

    @Column({ nullable: true })
    solijDuudah: string;

    @Column({ nullable: true })
    orhijDuudah: string;

    @Column({ nullable: true, type: 'text' })
    beltgelUyeNeg: string;

    @Column({ nullable: true })
    beltgelUyeHoyor: string;

    @Column({ nullable: true })
    beltgelUyeGurav: string;

    @Column({ nullable: true, type: 'text' })
    hevshuulehShatNeg: string;

    @Column({ nullable: true, type: 'text' })
    hevshuulehShatHoyor: string;

    @Column({ nullable: true })
    usegTaviltZurag: string;

    @Column({ nullable: true })
    shalgahZuragNeg: string;

    @Column({ nullable: true })
    shalgahZuragHoyor: string;

    @Column({ nullable: true })
    shalgahZuragGurav: string;

    @Column({ nullable: true })
    shalgahZuragDorov: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => SubPractice, (subPractice) => subPractice.practice, {
        eager: true,
        onDelete: 'SET NULL',
    })
    dasgaluud: SubPractice[];
}
