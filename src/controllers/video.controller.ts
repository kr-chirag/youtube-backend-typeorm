import { Request, Response } from "express-serve-static-core";
import { deleteVideo, getVideo, insertVideo } from "../services/video.service";
import fs from "fs";
import { deleteLike, getLike, insertLike } from "../services/like.service";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary";
import { ValPostVideo, ValVideoId } from "../utils/validation";
import { AuthError, BadRequestError } from "../utils/erros";

export async function handlePostVideo(req: Request, res: Response) {
    if (!req.file) throw new BadRequestError("Video file is required", "video");
    const { title, description } = await ValPostVideo.validateAsync(req.body);

    const url = await uploadToCloudinary(req.file.path);
    const video = await insertVideo(title, url, req.userId, description);

    fs.unlinkSync(req.file.path);
    res.status(201).json({ status: "success", video });
}

export async function handleGetVideo(
    req: Request<{ videoId: string }>,
    res: Response
) {
    const videoId = await ValVideoId(req.params.videoId);
    const video = await getVideo(videoId);
    if (!video || !video.id)
        throw new BadRequestError("Video not found with id", "videoId");
    res.status(200).json({ status: "success", video });
}

export async function handleDeleteVideo(
    req: Request<{ videoId: string }>,
    res: Response
) {
    const videoId = await ValVideoId(req.params.videoId);
    const video = await getVideo(videoId);
    if (!video || !video.url || !video.id)
        throw new BadRequestError("Video not found with id", "videoId");
    if (video.createdBy !== req.userId) throw new AuthError();

    await deleteFromCloudinary(video.url);
    await deleteVideo(video.id);
    res.status(200).json({
        status: "success",
        video,
    });
}

export async function handlePostLike(
    req: Request<{ videoId: string }>,
    res: Response
) {
    const videoId = await ValVideoId(req.params.videoId);
    const alreadyLiked = await getLike(videoId, req.userId);
    if (!alreadyLiked) await insertLike(videoId, req.userId);
    res.status(200).json({
        status: "success",
        message: videoId + " liked successfuly",
    });
}

export async function handleDeleteLike(
    req: Request<{ videoId: string }>,
    res: Response
) {
    const videoId = await ValVideoId(req.params.videoId);
    await deleteLike(videoId, req.userId);
    res.status(200).json({
        status: "success",
        meaase: "like removed",
        videoId: req.params.videoId,
    });
}
