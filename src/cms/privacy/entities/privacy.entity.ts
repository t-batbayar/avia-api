import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'privacy' })
export class Privacy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'longtext' })
    body: string;
}
