import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'terms' })
export class Terms {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'longtext' })
    body: string;
}
