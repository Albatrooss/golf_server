import { Query, Resolver } from 'type-graphql';
import { User } from '../entities/User';
import { Arg, Ctx, Field, Mutation, ObjectType } from 'type-graphql';
import { MyContext } from '../types';
import argon from 'argon2';
import { getConnection } from 'typeorm';

@ObjectType()
export class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver(User)
export class UserResolver {
    @Query(() => User, { nullable: true })
    me(@Ctx() { req }: MyContext): Promise<User | undefined> {
        const userId = req.session.userId;
        if (!userId) return new Promise(res => res(undefined));
        return User.findOne(userId);
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('username') username: string,
        @Arg('password') password: string,
        @Ctx() { req }: MyContext,
    ): Promise<UserResponse> {
        console.log('registering')
        if (username.length < 3)
            return {
                errors: [
                    {
                        field: 'username',
                        message: 'Username must be at least 3 characters',
                    },
                ],
            };
        if (password.length < 6)
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'Password must be at least 6 characters',
                    },
                ],
            };
        const hashedPassword = await argon.hash(password);
        let user;
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    username,
                    password: hashedPassword,
                })
                .returning('*')
                .execute();
            user = result.raw[0];
        } catch (e) {
            if (e.detail.includes('already exists')) {
                return {
                    errors: [
                        {
                            field: 'username',
                            message: 'Username taken',
                        },
                    ],
                };
            }
            return {
                errors: [
                    {
                        field: 'username',
                        message: e.message,
                    },
                ],
            };
        }
        req.session.userId = user.id;
        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('username') username: string,
        @Arg('password') password: string,
        @Ctx() { req }: MyContext,
    ): Promise<UserResponse> {
        const user = await User.findOne({ username });
        if (!user)
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'Access denied',
                    },
                ],
            };
        const passwordVerified = await argon.verify(user.password, password)
        if (!passwordVerified) return {
            errors: [{
                field: 'password',
                message: 'Access denied'
            }]
        }
        req.session.userId = user.id;
        return { user };
    }
}
