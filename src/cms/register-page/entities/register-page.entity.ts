import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'register_page' })
export class RegisterPage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'img_url' })
    imgUrl: string;
}
