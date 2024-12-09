import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Practice } from '../../practice/entities/practice.entity';

@Entity()
export class SubPractice {
    @PrimaryKey()
    id: number;

    @Property()
    ner: string;

    @Property({ nullable: true })
    argachlal: string;

    @Property({ nullable: true })
    zorilgo: string;

    @Property()
    tailbar: string;

    @Property({ type: 'text' })
    shuleg: string;

    @Property()
    thumbnail: string;

    @Property()
    video: string;

    @ManyToOne({ entity: () => Practice })
    practice!: Practice;

    @Property({ name: 'created_at' })
    createdAt = new Date();

    @Property({ name: 'updated_at', onUpdate: () => new Date() })
    updatedAt: Date;
}
