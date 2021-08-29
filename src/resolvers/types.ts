import { Course } from "../entities/Course";
import { Score } from "../entities/Score";
import { InputType, Field, ObjectType, Int } from "type-graphql";
import { FieldError } from "./user";

@InputType()
export class ScoreOptions {
    @Field()
    courseId!: number;

    @Field()
    date!: Date;

    @Field({ nullable: true })
    scr1?: number;
    @Field({ nullable: true })
    scr2?: number;
    @Field({ nullable: true })
    scr3?: number;
    @Field({ nullable: true })
    scr4?: number;
    @Field({ nullable: true })
    scr5?: number;
    @Field({ nullable: true })
    scr6?: number;
    @Field({ nullable: true })
    scr7?: number;
    @Field({ nullable: true })
    scr8?: number;
    @Field({ nullable: true })
    scr9?: number;
    @Field({ nullable: true })
    scr10?: number;
    @Field({ nullable: true })
    scr11?: number;
    @Field({ nullable: true })
    scr12?: number;
    @Field({ nullable: true })
    scr13?: number;
    @Field({ nullable: true })
    scr14?: number;
    @Field({ nullable: true })
    scr15?: number;
    @Field({ nullable: true })
    scr16?: number;
    @Field({ nullable: true })
    scr17?: number;
    @Field({ nullable: true })
    scr18?: number;
    @Field({ nullable: true })

    mod1?: number;
    @Field({ nullable: true })
    mod2?: number;
    @Field({ nullable: true })
    mod3?: number;
    @Field({ nullable: true })
    mod4?: number;
    @Field({ nullable: true })
    mod5?: number;
    @Field({ nullable: true })
    mod6?: number;
    @Field({ nullable: true })
    mod7?: number;
    @Field({ nullable: true })
    mod8?: number;
    @Field({ nullable: true })
    mod9?: number;
    @Field({ nullable: true })
    mod10?: number;
    @Field({ nullable: true })
    mod11?: number;
    @Field({ nullable: true })
    mod12?: number;
    @Field({ nullable: true })
    mod13?: number;
    @Field({ nullable: true })
    mod14?: number;
    @Field({ nullable: true })
    mod15?: number;
    @Field({ nullable: true })
    mod16?: number;
    @Field({ nullable: true })
    mod17?: number;
    @Field({ nullable: true })
    mod18?: number;
}


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
export class NineData {
    @Field(() => [Int])
    par!: number[];

    @Field(() => [Int])
    hdc!: number[];
}

@ObjectType()
class MyResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
}

@ObjectType()
export class ScoreResponse extends MyResponse {
    @Field(() => Score, { nullable: true })
    score?: Score;
}

@ObjectType()
export class ScoresResponse extends MyResponse {
    @Field(() => [Score], { nullable: true })
    scores?: Score[];
}

@ObjectType()
export class CourseResponse extends MyResponse {
    @Field(() => Course, { nullable: true })
    course?: Course;
}

@ObjectType()
export class CoursesResponse extends MyResponse {
    @Field(() => [Course], { nullable: true })
    courses?: Course[];
}
