import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hybrid_contact' })
export class HybridContact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    bio: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column({ name: 'image_path', nullable: true })
    imagePath: string;
}
