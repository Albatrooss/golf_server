import 'reflect-metadata';
import 'dotenv-safe/config';

import express from 'express';
import session from 'express-session';
import cors from 'cors';
import redis from 'redis';
import connectRedis from 'connect-redis';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { COOKIE_NAME, __prod__ } from './constants';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user';
import { User } from './entities/User';
import { Course } from './entities/Course';
import { CourseResolver } from './resolvers/course';
import { Score } from './entities/Score';
import { ScoreResolver } from './resolvers/score';
import { createUserLoader } from './util/createUserResolver';
import { createCourseLoader } from './util/createCourseResolver';

const {
    POSTGRES_USERNAME,
    POSTGRES_PASSWORD,
    CORS_ORIGIN,
    SESSION_SECRET,
    PORT,
} = process.env;

const main = async () => {
    await createConnection({
        type: 'postgres',
        host: 'localhost',
        database: 'golf',
        username: POSTGRES_USERNAME,
        password: POSTGRES_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [User, Course, Score],
    });

    const app = express();

    const redisClient = redis.createClient();
    redisClient.on('error', err =>
        console.log('could not connect to redis' + err),
    );
    redisClient.on('connect', () => console.log('connected to redis!'));
    const RedisStore = connectRedis(session);

    // app.set('proxy', 1);
    app.use(
        cors({
            origin: CORS_ORIGIN,
            credentials: true,
        }),
    );
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redisClient,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                secure: __prod__,
                sameSite: 'lax',
                domain: __prod__ ? 'ohohoh.ca' : undefined,
            },
            saveUninitialized: false,
            secret: SESSION_SECRET || 'ohhimark',
            resave: false,
        }),
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ UserResolver, CourseResolver, ScoreResolver ],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
            userLoader: createUserLoader(),
            courseLoader: createCourseLoader(),
        }),
    });
    // await apolloServer.start()
    apolloServer.applyMiddleware({ app, cors: false });

    const port = Number(PORT) || 4000;
    app.listen(port, () => console.log(`server started on port ${port}`));
};

main().catch(err => {
    console.log(err);
});
