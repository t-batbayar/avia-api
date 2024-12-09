import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Subscriptions {
    @PrimaryKey()
    id: number;

    @Property({ unique: true })
    email: string;

    @Property({ name: 'created_at', nullable: true })
    createdAt = new Date();

    @Property({
        name: 'updated_at',
        nullable: true,
        onUpdate: () => new Date(),
    })
    updatedAt: Date;
}
