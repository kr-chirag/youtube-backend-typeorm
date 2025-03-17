import { DataSource } from "typeorm";
import { Like, User, Video } from "../models";

export const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT || 5432),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Video, Like],
    subscribers: [],
    migrations: [],
});

export async function connectDatabase() {
    await dataSource.initialize();
    console.log("Database connected...");
}
