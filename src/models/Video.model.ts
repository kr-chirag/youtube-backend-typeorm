import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
} from "typeorm";
import { User } from "./User.model";
import { Like } from "./Like.model";

@Entity("videos")
export class Video {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    title!: string;

    @Column("text")
    url!: string;

    @Column("text")
    description?: string;

    @Column()
    createdBy!: number;

    @ManyToOne(() => User, (user) => user.videos, { onDelete: "CASCADE" })
    @JoinColumn({ name: "createdBy" })
    owner!: Relation<User>;

    @OneToMany(() => Like, (like) => like.video)
    likes!: [];
}
