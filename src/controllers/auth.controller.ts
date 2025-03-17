import { Request, Response } from "express-serve-static-core";
import { createUser, getUserByEmail } from "../services/user.service";
import bcrypt from "bcrypt";
import { createTokten } from "../utils/jwt.lib";
import { BadRequestError } from "../utils/erros";
import { ValLogin, ValSignup } from "../utils/validation";

export async function handleSignup(req: Request, res: Response) {
    const { name, email, password } = await ValSignup.validateAsync(req.body);

    if (await getUserByEmail(email))
        throw new BadRequestError("Email already registered", "email");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedPassword);
    res.cookie("auth-token", await createTokten({ ...user }));

    res.status(201).json({
        status: "success",
        message: "User created and Logged in successfully",
        user,
    });
}

export async function handleLogin(req: Request, res: Response) {
    const { email, password } = await ValLogin.validateAsync(req.body);
    const user = await getUserByEmail(email);
    if (!user)
        throw new BadRequestError("No user found with this email", "email");

    if (await bcrypt.compare(password, user?.password)) {
        res.cookie("auth-token", await createTokten({ ...user }));
        res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            userId: user.id,
        });
    }

    throw new BadRequestError("Invalid Password", "password");
}
