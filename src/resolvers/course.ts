import { FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Arg, Ctx, Mutation } from 'type-graphql';
import { MyContext } from '../types';
import { getConnection } from 'typeorm';
import { Course } from '../entities/Course';
import { NineData, CourseResponse, CoursesResponse, CourseOptions } from './types';

@Resolver(Course)
export class CourseResolver {
    @FieldResolver(() => NineData)
    front(@Root() course: Course): NineData {
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
    back(@Root() course: Course): NineData {
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
            return {
                errors: [
                    {
                        field: 'error',
                        message: e.message
                    }
                ]
            }
        }
        return { course };
    }
}
