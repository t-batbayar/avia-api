import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'privacy' })
export class Privacy {
    @PrimaryKey()
    id: number;

    @Property({ nullable: true, type: 'longtext' })
    body: string;
}
