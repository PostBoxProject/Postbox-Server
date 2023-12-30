import { PostBox } from "src/postboxs/postbox.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Letter extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    reed: boolean;

    @OneToMany(() => PostBox, (postbox) => postbox.letter)
    postbox: PostBox;
}