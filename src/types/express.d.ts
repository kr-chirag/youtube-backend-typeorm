import { User } from "../models";

declare global {
    namespace Express {
        interface Request {
            userId: number;
        }
    }
}

export {};
