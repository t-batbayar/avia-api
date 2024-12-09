import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

export enum CmsUserRoles {
    ADMIN = 'ADMIN',
    PUBLISHER = 'PUBLISHER',
    ANALYST = 'ANALYST',
}

@Entity()
export class CmsUser {
    @PrimaryKey()
    id: number;

    @Property()
    name: string;

    @Property({ unique: true })
    email: string;

    @Property()
    password: string;

    // @Column({
    //     type: 'enum',
    //     enum: CmsUserRoles,
    //     default: CmsUserRoles.PUBLISHER,
    // })
    // role: CmsUserRoles;
}
