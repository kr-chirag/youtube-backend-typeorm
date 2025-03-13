import jwt from "jsonwebtoken";

interface ITokenPayload {
    id: number;
    name?: string;
    email?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "MyJwtSecret";

export async function createTokten(payload: ITokenPayload): Promise<string> {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "30 days",
    });
}

export async function decodeToken(token: string): Promise<ITokenPayload> {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    return decodedToken as ITokenPayload;
}
