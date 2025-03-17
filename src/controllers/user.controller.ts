import { Request, Response } from "express-serve-static-core";
import { getAllUsers, getUserByID } from "../services/user.service";
import { ValUserId } from "../utils/validation";
import { BadRequestError } from "../utils/erros";

export async function handleGetUser(
    req: Request<{ userId: string }>,
    res: Response
) {
    const userId = await ValUserId(req.params.userId);
    const user = await getUserByID(userId);

    if (!user || !user.id)
        throw new BadRequestError("User not found with this user id", "userId");
    res.status(200).json({ status: "success", user });
}

export async function handleGetAllUsers(req: Request, res: Response) {
    const users = await getAllUsers();
    res.status(200).json({ status: "success", users });
}
