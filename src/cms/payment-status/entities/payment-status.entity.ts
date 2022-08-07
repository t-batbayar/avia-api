import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'payment_enabled', default: false })
    paymentEnabled: boolean;
}
