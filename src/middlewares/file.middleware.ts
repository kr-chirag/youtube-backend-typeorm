import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.resolve("./uploads");
        try {
            fs.mkdirSync(dir);
        } catch (error) {}
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${req.userId}-${file.originalname}`);
    },
});

const uploader = multer({ storage });

export function uploadSingleFiles(filesName: string) {
    return uploader.single(filesName);
}
