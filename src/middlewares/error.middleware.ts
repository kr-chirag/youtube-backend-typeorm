import { NextFunction, Request, Response } from "express-serve-static-core";
import { CustomError } from "../utils/erros";
import Joi from "joi";
import fs from "fs";

export async function errorhandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof CustomError) {
        res.status(error.statusCode).json({
            status: "failed",
            error: error.error,
        });
    } else if (error instanceof Joi.ValidationError) {
        res.status(400).send({
            status: "failed",
            error: {
                field: error.details[0].path[0],
                message: error.details[0].message,
            },
        });
    } else {
        // unhandled errors
        console.error(error);
        res.status(500).send({
            status: "failed",
            error: "Something went wrong",
        });
    }

    if (req.file) fs.unlinkSync(req.file?.path);
}
