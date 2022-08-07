import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hybrid_description' })
export class HybridDescription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'varchar' })
    title: string;

    @Column({ nullable: true, type: 'longtext' })
    body: string;
}
