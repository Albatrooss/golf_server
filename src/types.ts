import { SessionData } from "express-session";
import { Redis } from "ioredis";

export type MyContext = {
    req: Request & { session: SessionData & { userId: number } };
    res: Response;
    redis: Redis;
}