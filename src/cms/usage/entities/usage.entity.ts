import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'usage' })
export class Usage {
    @PrimaryKey()
    id: number;

    @Property({ nullable: true, type: 'longtext' })
    body: string;
}
