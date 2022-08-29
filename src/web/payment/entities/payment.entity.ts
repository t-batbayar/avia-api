import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payment' })
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'invoice_id' })
    invoiceId: string;

    @Column({ name: 'user_email' })
    userEmail: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
