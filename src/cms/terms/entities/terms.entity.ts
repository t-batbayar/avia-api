import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'terms' })
export class Terms {
    @PrimaryKey()
    id: number;

    @Property({ nullable: true, type: 'longtext' })
    body: string;
}
