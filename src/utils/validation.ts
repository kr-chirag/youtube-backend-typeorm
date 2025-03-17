import joi from "joi";
import { BadRequestError } from "./erros";

export const ValLogin = joi.object({
    email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required(),
    password: joi.string().min(3).required(),
});

export const ValSignup = ValLogin.append({
    name: joi.string().required(),
});

export const ValPostVideo = joi.object({
    title: joi.string().required(),
    description: joi.string(),
});

async function validateId(id: string, name: string): Promise<number> {
    return Number(
        await joi
            .string()
            .pattern(/^[0-9]+$/)
            .error(new BadRequestError("Invalid " + name, name))
            .validateAsync(id)
    );
}

export const ValUserId = (userid: string) => validateId(userid, "userId");
export const ValVideoId = (userid: string) => validateId(userid, "videoId");
