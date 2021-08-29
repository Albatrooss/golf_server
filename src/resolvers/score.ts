import { FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Arg, Ctx, Mutation } from 'type-graphql';
import { MyContext } from '../types';
import { getConnection } from 'typeorm';
import { Score } from '../entities/Score';
import { User } from '../entities/User';
import { ScoresResponse, ScoreResponse, ScoreOptions, NineData } from './types';

@Resolver(Score)
export class ScoreResolver {
    @FieldResolver(() => User)
    player(@Root() score: Score, @Ctx() { userLoader }: MyContext) {
        return userLoader.load(score.playerId);
    }

    @FieldResolver(() => String)
    async courseName(@Root() score: Score, @Ctx() { courseLoader }: MyContext) {
        const course = await courseLoader.load(score.courseId);
        return course.name;
    }

    @FieldResolver(() => NineData)
    async front(@Root() score: Score, @Ctx() { courseLoader }: MyContext): NineData {
        const course = await courseLoader.load(score.courseId);
        return {
            par: [
                course.par1,
                course.par2,
                course.par3,
                course.par4,
                course.par5,
                course.par6,
                course.par7,
                course.par8,
                course.par9,
            ],
            hdc: [
                course.hdc1,
                course.hdc2,
                course.hdc3,
                course.hdc4,
                course.hdc5,
                course.hdc6,
                course.hdc7,
                course.hdc8,
                course.hdc9,
                
            ]
        }
    }

    @FieldResolver(() => NineData)
    async back(@Root() score: Score, @Ctx() { courseLoader }: MyContext): NineData {
        const course = await courseLoader.load(score.courseId);
        return {
            par: [
                course.par10,
                course.par11,
                course.par12,
                course.par13,
                course.par14,
                course.par15,
                course.par16,
                course.par17,
                course.par18,
            ],
            hdc: [
                course.hdc10,
                course.hdc11,
                course.hdc12,
                course.hdc13,
                course.hdc14,
                course.hdc15,
                course.hdc16,
                course.hdc17,
                course.hdc18,
                
            ]
        }
    }

    @Query(() => ScoresResponse)
    async myScores(@Ctx() { req }: MyContext): Promise<ScoresResponse> {
        if (!req.session.userId) {
            return {
                errors: [
                    {
                        field: 'error',
                        message: 'Must be logged in to do this',
                    },
                ],
            };
        }
        const scores = await Score.find({
            where: {
                playerId: req.session.userId,
            },
        });
        return { scores };
    }

    @Query(() => ScoreResponse)
    async score(
        @Arg('scoreId') scoreId: number,
        @Ctx() { req }: MyContext,
    ): Promise<ScoreResponse> {
        if (!req.session.userId) {
            return {
                errors: [
                    {
                        field: 'error',
                        message: 'Must be logged in to do this',
                    },
                ],
            };
        }
        const score = await Score.findOne(scoreId);
        return { score };
    }

    @Mutation(() => ScoreResponse)
    async saveScore(
        @Arg('options') options: ScoreOptions,
        @Ctx() { req }: MyContext,
    ): Promise<ScoreResponse> {
        const userId = req.session.userId;
        if (!userId)
            return {
                errors: [
                    {
                        field: 'error',
                        message: 'Must be logged in to do this',
                    },
                ],
            };
        let score;
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Score)
                .values({
                    ...options,
                    playerId: userId,
                })
                .returning('*')
                .execute();
            score = result.raw[0];
        } catch (e) {
            return {
                errors: [
                    {
                        field: 'error',
                        message: e.message,
                    },
                ],
            };
        }
        return { score };
    }
}
