import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum PaymentStatus {
    NEW,
    FAILED,
    PAID,
    PARTIAL,
    REFUNDED,
}

@Entity({ name: 'payment' })
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'invoice_id' })
    invoiceId: string;

    @Column({ name: 'user_email' })
    userEmail: string;

    @Column({ name: 'qpay_id', nullable: false })
    qpayId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
