import { User, Video } from "../models";
import { dataSource } from "../utils/dataSource";

const VideoRepository = dataSource.getRepository(Video);

export async function insertVideo(
    title: string,
    url: string,
    createdBy: number,
    description?: string
) {
    const video = VideoRepository.create({
        title,
        url,
        createdBy,
        description,
    });
    await VideoRepository.save(video);
    return video;
}

export async function getVideo(id: number) {
    const video = await VideoRepository.findOne({
        where: { id },
        relations: { likes: true },
    });
    return { ...video, likes: video?.likes.length };
}

export async function deleteVideo(id: number) {
    await VideoRepository.delete({ id });
}
