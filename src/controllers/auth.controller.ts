import { Request, Response } from "express-serve-static-core";
import { createUser, getUserByEmail } from "../services/user.service";
import bcrypt from "bcrypt";
import { createTokten } from "../utils/jwt.lib";

interface IBody {
    name: string;
    email: string;
    password: string;
}

export async function handleSignup(req: Request<{}, {}, IBody>, res: Response) {
    const { name, email, password } = req.body;
    if (await getUserByEmail(email)) {
        res.status(400).json({
            status: "error",
            message: "This email is alredy registered",
        });
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(name, email, hashedPassword);
        res.cookie(
            "auth-token",
            await createTokten({
                id: user.id,
                name: user.name,
                email: user.email,
            })
        );
        res.status(201).json({
            status: "success",
            message: "User created and Logged in successfully",
            user,
        });
    }
}

export async function handleLogin(
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response
) {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user)
        res.status(400).json({
            status: "error",
            message: "No user found with this email",
        });
    else if (await bcrypt.compare(password, user?.password)) {
        res.cookie(
            "auth-token",
            await createTokten({
                id: user.id,
                name: user.name,
                email: user.email,
            })
        );
        res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            user,
        });
    } else
        res.status(400).json({
            status: "error",
            message: "Invalid Password",
        });
}
