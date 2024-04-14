import { Letter } from "src/letters/letter.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class PostBox extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    // @Column()
    // role: string;

    @OneToMany(() => Letter, (letter) => letter.postbox)
    letter: Letter[];
}