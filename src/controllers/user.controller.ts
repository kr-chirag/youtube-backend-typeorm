import { Request, Response } from "express-serve-static-core";
import { getAllUsers, getUserByID } from "../services/user.service";

export async function handleGetUser(
    req: Request<{ userId: string }>,
    res: Response
) {
    try {
        const userId = Number(req.params.userId);
        const user = await getUserByID(userId);
        if (!user)
            res.status(400).json({
                status: "error",
                error: "User not found with this user id",
            });
        else res.status(200).json({ status: "success", user });
    } catch (error) {
        res.status(500).json({ status: "error", error });
    }
}

export async function handleGetAllUsers(req: Request, res: Response) {
    const users = await getAllUsers();
    res.status(200).json({ status: "success", users });
}
