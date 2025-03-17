import { User } from "../models";
import { dataSource } from "../utils/dataSource";

const UserRepository = dataSource.getRepository(User);

const selectOptions = {
    id: true,
    name: true,
    email: true,
};

export async function createUser(name: string, email: string, pass: string) {
    const user = UserRepository.create({ name, email, password: pass });
    await UserRepository.save(user);
    const { password, ...userWithouPassword } = user;
    return userWithouPassword;
}

export async function getUserByEmail(email: string) {
    const user = await UserRepository.findOneBy({ email });
    return user;
}

export async function getUserByID(id: number) {
    const user = await UserRepository.findOne({
        where: { id },
        relations: {
            liked_videos: {
                video: {
                    likes: true,
                },
            },
            videos: {
                likes: true,
            },
        },
        select: selectOptions,
    });
    return {
        ...user,
        videos: user?.videos.map((video) => ({
            ...video,
            likes: video.likes.length,
        })),
        liked_videos: user?.liked_videos.map((liked_video) => ({
            ...liked_video.video,
            likes: liked_video.video.likes.length,
        })),
    };
}

export async function getAllUsers() {
    const allUser = await UserRepository.find({
        select: selectOptions,
    });
    return allUser;
}
