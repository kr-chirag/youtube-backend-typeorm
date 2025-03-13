import {
    Column,
    Entity,
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
    title: string;

    @Column("text")
    url: string;

    @Column("text")
    description?: string;

    @ManyToOne(() => User, (user) => user.videos)
    createdBy: Relation<User>;

    @OneToMany(() => Like, (like) => like.videoId)
    likes!: [];

    constructor(
        title: string,
        url: string,
        createdBy: User,
        description?: string
    ) {
        this.title = title;
        this.url = url;
        this.description = description;
        this.createdBy = createdBy;
    }
}
