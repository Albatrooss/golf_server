import { InputType, Query, Resolver } from 'type-graphql';
import { Arg, Ctx, Field, Mutation, ObjectType } from 'type-graphql';
import { MyContext } from '../types';
import { getConnection } from 'typeorm';
import { Course } from '../entities/Course';
import { FieldError } from './user';

@InputType()
export class CourseOptions {
    @Field()
    name: string;
    @Field()
    par1: number;
    @Field()
    par2: number;
    @Field()
    par3: number;
    @Field()
    par4: number;
    @Field()
    par5: number;
    @Field()
    par6: number;
    @Field()
    par7: number;
    @Field()
    par8: number;
    @Field()
    par9: number;
    @Field()
    par10: number;
    @Field()
    par11: number;
    @Field()
    par12: number;
    @Field()
    par13: number;
    @Field()
    par14: number;
    @Field()
    par15: number;
    @Field()
    par16: number;
    @Field()
    par17: number;
    @Field()
    par18: number;
    @Field()
    hdc1?: number;
    @Field()
    hdc2?: number;
    @Field()
    hdc3?: number;
    @Field()
    hdc4?: number;
    @Field()
    hdc5?: number;
    @Field()
    hdc6?: number;
    @Field()
    hdc7?: number;
    @Field()
    hdc8?: number;
    @Field()
    hdc9?: number;
    @Field()
    hdc10?: number;
    @Field()
    hdc11?: number;
    @Field()
    hdc12?: number;
    @Field()
    hdc13?: number;
    @Field()
    hdc14?: number;
    @Field()
    hdc15?: number;
    @Field()
    hdc16?: number;
    @Field()
    hdc17?: number;
    @Field()
    hdc18?: number;
}

@ObjectType()
class CourseResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Course, { nullable: true })
    course?: Course;
}

@ObjectType()
class CoursesResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => [Course], { nullable: true })
    courses?: Course[];
}

@Resolver(Course)
export class CourseResolver {
    @Query(() => CourseResponse)
    async course(
        @Arg('courseId') courseId: number,
        @Ctx() { req }: MyContext,
    ): Promise<CourseResponse> {
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
        const course = await Course.findOne(courseId);
        return { course };
    }

    @Query(() => CoursesResponse)
    async allCourses(@Ctx() { req }: MyContext): Promise<CoursesResponse> {
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
        const courses = await Course.find();
        return { courses };
    }

    @Mutation(() => CourseResponse)
    async createCourse(
        @Arg('options') options: CourseOptions,
        @Ctx() { req }: MyContext,
    ): Promise<CourseResponse> {
        if (!req.session.userId)
            return {
                errors: [
                    {
                        field: 'error',
                        message: 'Must be logged in to do this',
                    },
                ],
            };
        let course;
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Course)
                .values(options)
                .returning('*')
                .execute();
            course = result.raw[0];
        } catch (e) {
            if (e.detail.includes('already exists')) {
                return {
                    errors: [
                        {
                            field: 'error',
                            message: 'course name taken',
                        },
                    ],
                };
            }
            return e.message;
        }
        return { course };
    }
}
