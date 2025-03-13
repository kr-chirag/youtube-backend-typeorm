import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import {
    handleGetAllUsers,
    handleGetUser,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.use(checkAuth);

userRouter.route("/:userId").get(handleGetUser);
userRouter.get("/", handleGetAllUsers);

export default userRouter;
