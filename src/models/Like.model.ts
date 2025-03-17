import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
} from "typeorm";
import { Video } from "./Video.model";
import { User } from "./User.model";

@Entity("likes")
export class Like {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    videoId!: number;

    @Column()
    userId!: number;

    @ManyToOne(() => Video, (video) => video.likes, { onDelete: "CASCADE" })
    @JoinColumn({ name: "videoId" })
    video!: Relation<Video>;

    @ManyToOne(() => User, (user) => user.liked_videos, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user!: Relation<User>;
}
