import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usage' })
export class Usage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'longtext' })
    body: string;
}
