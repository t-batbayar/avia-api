import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sector_main_info' })
export class SectorMainInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: 'main_id' })
    mainId: number;

    @Column()
    level_1_id: string;

    @Column({ name: 'horizontal_name' })
    horizontalName: string;

    @Column({ name: 'vertical_name' })
    verticalName: string;
}
