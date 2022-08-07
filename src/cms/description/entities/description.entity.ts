import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'description' })
export class Description {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'longtext' })
    body: string;

    @Column({ nullable: true, type: 'int' })
    order: number;
}
