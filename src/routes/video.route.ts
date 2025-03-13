import express from "express";
import { uploadSingleFiles } from "../middlewares/file.middleware";
import { checkAuth } from "../middlewares/auth.middleware";
import {
    handleDeleteLike,
    handleDeleteVideo,
    handleGetVideo,
    handlePostLike,
    handlePostVideo,
} from "../controllers/video.controller";

const videoRouter = express.Router();

videoRouter.post("/", checkAuth, uploadSingleFiles("video"), handlePostVideo);
videoRouter
    .route("/like/:videoId")
    .post(checkAuth, handlePostLike)
    .delete(checkAuth, handleDeleteLike);
videoRouter
    .route("/:videoId")
    .get(handleGetVideo)
    .delete(checkAuth, handleDeleteVideo);

export default videoRouter;
