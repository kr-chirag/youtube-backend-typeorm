import { Like, User } from "../models";
import { dataSource } from "../utils/dataSource";

const Likerepository = dataSource.getRepository(Like);

export async function getLike(videoId: number, userId: number) {
    const like = await Likerepository.findOneBy({ videoId, userId });
    return like;
}

export async function insertLike(videoId: number, userId: number) {
    const like = Likerepository.create({ videoId, userId });
    await Likerepository.save(like);
    return like;
}

export async function deleteLike(videoId: number, userId: number) {
    await Likerepository.delete({ videoId, userId });
}
