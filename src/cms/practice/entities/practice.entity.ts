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

    @Column()
    solijDuudah: string;

    @Column()
    orhijDuudah: string;

    @Column()
    beltgelUyeNeg: string;

    @Column()
    beltgelUyeHoyor: string;

    @Column()
    beltgelUyeGurav: string;

    @Column({ nullable: true })
    usegTaviltZurag: string;

    @Column()
    shalgahZuragNeg: string;

    @Column()
    shalgahZuragHoyor: string;

    @Column()
    shalgahZuragGurav: string;

    @Column()
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
