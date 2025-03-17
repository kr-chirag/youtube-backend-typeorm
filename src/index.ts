import "./configs";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import videoRouter from "./routes/video.route";
import { connectDatabase } from "./utils/dataSource";
import { errorhandler } from "./middlewares/error.middleware";

connectDatabase();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/video", videoRouter);

app.use(errorhandler);

app.listen(3000, (error?: Error) => {
    if (error) console.log(error);
    else console.log("Server started at http://localhost:3000");
});
