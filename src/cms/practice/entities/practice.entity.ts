import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { SubPractice } from '../../sub-practice/entities/sub-practice.entity';

@Entity()
export class Practice {
    @PrimaryKey()
    id: number;

    @Property()
    useg: string;

    @Property({ nullable: true })
    ongo: string;

    @Property({ nullable: true, type: 'int' })
    order: number;

    @Property({ nullable: true, type: 'text' })
    tailbar: string;

    @Property({ nullable: true })
    solijDuudah: string;

    @Property({ nullable: true })
    orhijDuudah: string;

    @Property({ nullable: true, type: 'text' })
    beltgelUyeNeg: string;

    @Property({ nullable: true })
    beltgelUyeHoyor: string;

    @Property({ nullable: true })
    beltgelUyeGurav: string;

    @Property({ nullable: true, type: 'text' })
    hevshuulehShatNeg: string;

    @Property({ nullable: true, type: 'text' })
    hevshuulehShatHoyor: string;

    @Property({ nullable: true })
    usegTaviltZurag: string;

    @Property({ nullable: true })
    shalgahZuragNeg: string;

    @Property({ nullable: true })
    shalgahZuragHoyor: string;

    @Property({ nullable: true })
    shalgahZuragGurav: string;

    @Property({ nullable: true })
    shalgahZuragDorov: string;

    @Property({ name: 'created_at' })
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date;

    @OneToMany(() => SubPractice, (subPractice) => subPractice.practice, {
        eager: true,
        orphanRemoval: false,
    })
    dasgaluud: SubPractice[];
}
