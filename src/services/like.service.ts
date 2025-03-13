import { Like, User } from "../models";
import { dataSource } from "../utils/dataSource";

const Likerepository = dataSource.getRepository(Like);

export async function getLike(videoId: number, userId: number) {}

export async function insertLike(videoId: number, user: User) {}

export async function deleteLike(videoId: number, userId: number) {}
