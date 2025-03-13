import {
    Column,
    Entity,
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

    @ManyToOne(() => Video, (video) => video.likes)
    videoId: Relation<Video>;

    @ManyToOne(() => User, (user) => user.liked_videos)
    userId: Relation<User>;

    constructor(video: Video, user: User) {
        this.videoId = video;
        this.userId = user;
    }
}
