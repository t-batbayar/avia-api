import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    deviceId: string;

    @Column()
    loginType: string;

    @Column({ nullable: true })
    purchaseEndDate: Date;
}
