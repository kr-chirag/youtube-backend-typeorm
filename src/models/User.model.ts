import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./Video.model";
import { Like } from "./Like.model";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    name!: string;

    @Column("text")
    email!: string;

    @Column("text")
    password!: string;

    @OneToMany(() => Video, (video) => video.owner)
    videos!: Video[];

    @OneToMany(() => Like, (like) => like.user)
    liked_videos!: Like[];
}
