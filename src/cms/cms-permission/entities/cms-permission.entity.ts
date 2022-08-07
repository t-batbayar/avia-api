import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum CMS_PERMISSION {
    ADMIN = 'ADMIN',
    PUBLISHER = 'PUBLISHER',
    ANALYST = 'ANALYST',
}

export type CmsRoutes =
    | 'description'
    | 'hybrid'
    | 'macro_economy'
    | 'economy_sector'
    | 'admin_config'
    | 'others'
    | 'news'
    | 'customers';

@Entity({ name: 'cms_permission' })
export class CmsPermission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'allowed_roles',
        type: 'json',
        nullable: true,
    })
    allowedRoles: CmsRoutes[];

    @Column({ name: 'cms_role', nullable: true })
    cmsRoles: CMS_PERMISSION;
}
