import { User, Video } from "../models";
import { dataSource } from "../utils/dataSource";

const VideoRepository = dataSource.getRepository(Video);

export async function insertVideo(
    title: string,
    url: string,
    createdBy: User,
    description?: string
) {
    const video = new Video(title, url, createdBy, description);
    await VideoRepository.save(video);
    return video;
}

export async function getVideo(id: number) {
    const video = await VideoRepository.findOne({ where: { id } });
    return video;
}

export async function deleteVideo(id: number) {
    const video = await VideoRepository.findOne({ where: { id } });
    await VideoRepository.delete({ id });
    return video;
}
