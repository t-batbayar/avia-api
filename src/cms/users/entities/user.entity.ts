import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
    @PrimaryKey()
    id: number;

    @Property()
    email: string;

    @Property()
    deviceId: string;

    @Property()
    loginType: string;

    @Property({ nullable: true })
    purchaseEndDate: Date;

    @Property({ type: 'boolean', default: false })
    userIsBlocked: boolean;
}
