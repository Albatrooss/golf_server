import { Request, Response } from 'express';
import { SessionData } from "express-session";
import { Redis } from "ioredis";
import { createCourseLoader } from "./util/createCourseResolver";
import { createUserLoader } from "./util/createUserResolver";

export type MyContext = {
    req: Request & { session: SessionData & { userId: number } };
    res: Response;
    redis: Redis;
    userLoader: ReturnType<typeof createUserLoader>;
    courseLoader: ReturnType<typeof createCourseLoader>;
}