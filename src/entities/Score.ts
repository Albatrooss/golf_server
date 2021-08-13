import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Course } from './Course';
import { User } from './User';

@ObjectType()
@Entity()
export class Score extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole1?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole2?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole3?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole4?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole5?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole6?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole7?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole8?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole9?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole10?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole11?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole12?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole13?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole14?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole15?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole16?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole17?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    hole18?: number;


    @Field({nullable: true})
    @Column({nullable: true})
    apr1?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr2?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr3?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr4?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr5?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr6?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr7?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr8?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr9?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr10?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr11?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr12?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr13?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr14?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr15?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr16?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr17?: number;

    @Field({nullable: true})
    @Column({nullable: true})
    apr18?: number;

    @Field(() => String)
    @UpdateDateColumn()
    date: Date;

    @Field()
    @Column()
    playerId!: number;
    
    @Field(() => User)
    @ManyToOne(() => User, user => user.scores, { nullable: false })
    player!: User;
    
    @Field()
    @Column()
    courseId!: number;
    
    @Field(() => Course)
    @ManyToOne(() => Course, course => course.scores, { nullable: false })
    course!: Course;
}
