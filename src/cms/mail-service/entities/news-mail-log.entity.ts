import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'news_subscription_log' })
export class NewsMailLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'mail_address' })
    mailAddress: string;

    @Column({ name: 'mail_content_type', nullable: true })
    mailContentType: string;

    @CreateDateColumn({ name: 'created_at', nullable: true })
    createdAt: Date;

    @Column({ name: 'mail_title', nullable: true })
    mailTitle: string;

    @Column({ name: 'successfully_sent', type: 'bool', nullable: true })
    successfullySent: boolean;

    @Column({ name: 'is_customer_email', type: 'bool', nullable: true })
    isCustomerEmail: boolean;
}
