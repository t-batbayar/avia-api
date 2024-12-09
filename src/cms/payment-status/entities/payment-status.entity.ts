import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class PaymentStatus {
    @PrimaryKey()
    id: number;

    @Property({ name: 'payment_enabled', default: false })
    paymentEnabled: boolean;
}
