import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Research } from '../../research/entities/research.entity';

@Entity('research_type')
export class ResearchType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: 'display_order', nullable: true })
    displayOrder: number;

    @Column({ name: 'show', nullable: true, default: true, type: 'boolean' })
    show: boolean;

    @OneToMany(() => Research, (research) => research.researchType, {
        eager: true,
        onDelete: 'SET NULL',
    })
    research: Research[];
}
