import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

export enum PaymentStatus {
    NEW = 'NEW',
    FAILED = 'FAILED',
    PAID = 'PAID',
    PARTIAL = 'PARTIAL',
    REFUNDED = 'REFUNDED',
}

@Entity({ tableName: 'payment' })
export class Payment {
    @PrimaryKey()
    id: number;

    @Property({ name: 'invoice_id' })
    invoiceId: string;

    @Property({ name: 'user_email' })
    userEmail: string;

    @Property({ name: 'qpay_id', nullable: false })
    qpayId: string;

    @Property({ name: 'created_at' })
    createdAt = new Date();

    @Property({ name: 'updated_at', onUpdate: () => new Date() })
    updatedAt = new Date();
}
