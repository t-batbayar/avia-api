import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'description' })
export class Description {
    @PrimaryKey()
    id: number;

    @Property({ nullable: true, type: 'longtext' })
    body: string;

    @Property({ nullable: true, type: 'int' })
    order: number;
}
