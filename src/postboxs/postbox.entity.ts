import { Letter } from "src/letters/letter.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostBox extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Letter, (letter) => letter.postbox)
    letter: Letter[];
}