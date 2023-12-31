import { PostBox } from "src/postboxs/postbox.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Letter extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    reed: boolean;

    @ManyToOne(() => PostBox, (postbox) => postbox.letter)
    postbox: PostBox;
}