import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export enum CmsUserRoles {
    ADMIN = 'ADMIN',
    PUBLISHER = 'PUBLISHER',
    ANALYST = 'ANALYST',
}

@Entity()
export class CmsUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    // @Column({
    //     type: 'enum',
    //     enum: CmsUserRoles,
    //     default: CmsUserRoles.PUBLISHER,
    // })
    // role: CmsUserRoles;
}
