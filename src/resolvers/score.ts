import { FieldResolver, InputType, Query, Resolver, Root } from 'type-graphql';
import { Arg, Ctx, Field, Mutation, ObjectType } from 'type-graphql';
import { MyContext } from '../types';
import { getConnection } from 'typeorm';
import { FieldError } from './user';
import { Score } from '../entities/Score';
import { User } from '../entities/User';

@InputType()
class ScoreOptions {
    @Field()
    courseId!: number;
    @Field({ nullable: true })
    hole1: number;
    @Field({ nullable: true })
    hole2: number;
    @Field({ nullable: true })
    hole3: number;
    @Field({ nullable: true })
    hole4: number;
    @Field({ nullable: true })
    hole5: number;
    @Field({ nullable: true })
    hole6: number;
    @Field({ nullable: true })
    hole7: number;
    @Field({ nullable: true })
    hole8: number;
    @Field({ nullable: true })
    hole9: number;
    @Field({ nullable: true })
    hole10: number;
    @Field({ nullable: true })
    hole11: number;
    @Field({ nullable: true })
    hole12: number;
    @Field({ nullable: true })
    hole13: number;
    @Field({ nullable: true })
    hole14: number;
    @Field({ nullable: true })
    hole15: number;
    @Field({ nullable: true })
    hole16: number;
    @Field({ nullable: true })
    hole17: number;
    @Field({ nullable: true })
    hole18: number;
    @Field()
    date!: Date;
}

@ObjectType()
class ScoreResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Score, { nullable: true })
    score?: Score;
}

@ObjectType()
class ScoresResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => [Score], { nullable: true })
    scores?: Score[];
}

@Resolver(Score)
export class ScoreResolver {
    @FieldResolver(() => User)
    player(@Root() score: Score, @Ctx() { userLoader }: MyContext) {
        return userLoader.load(score.playerId);
    }

    @FieldResolver(() => Score)
    course(@Root() score: Score, @Ctx() { courseLoader }: MyContext) {
        return courseLoader.load(score.courseId);
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
