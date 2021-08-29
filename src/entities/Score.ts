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

    @Column({ nullable: true })
    hole1?: number;
    @Column({ nullable: true })
    hole2?: number;
    @Column({ nullable: true })
    hole3?: number;
    @Column({ nullable: true })
    hole4?: number;
    @Column({ nullable: true })
    hole5?: number;
    @Column({ nullable: true })
    hole6?: number;
    @Column({ nullable: true })
    hole7?: number;
    @Column({ nullable: true })
    hole8?: number;
    @Column({ nullable: true })
    hole9?: number;
    @Column({ nullable: true })
    hole10?: number;
    @Column({ nullable: true })
    hole11?: number;
    @Column({ nullable: true })
    hole12?: number;
    @Column({ nullable: true })
    hole13?: number;
    @Column({ nullable: true })
    hole14?: number;
    @Column({ nullable: true })
    hole15?: number;
    @Column({ nullable: true })
    hole16?: number;
    @Column({ nullable: true })
    hole17?: number;
    @Column({ nullable: true })
    hole18?: number;

    @Column({nullable: true})
    mod1?: number;
    @Column({nullable: true})
    mod2?: number;
    @Column({nullable: true})
    mod3?: number;
    @Column({nullable: true})
    mod4?: number;
    @Column({nullable: true})
    mod5?: number;
    @Column({nullable: true})
    mod6?: number;
    @Column({nullable: true})
    mod7?: number;
    @Column({nullable: true})
    mod8?: number;
    @Column({nullable: true})
    mod9?: number;
    @Column({nullable: true})
    mod10?: number;
    @Column({nullable: true})
    mod11?: number;
    @Column({nullable: true})
    mod12?: number;
    @Column({nullable: true})
    mod13?: number;
    @Column({nullable: true})
    mod14?: number;
    @Column({nullable: true})
    mod15?: number;
    @Column({nullable: true})
    mod16?: number;
    @Column({nullable: true})
    mod17?: number;
    @Column({nullable: true})
    mod18?: number;

    @Field(() => String)
    @UpdateDateColumn()
    date: Date;

    @Column()
    playerId!: number;
    
    @Field(() => User)
    @ManyToOne(() => User, user => user.scores, { nullable: false })
    player!: User;
    
    @Column()
    courseId!: number;
    
    @ManyToOne(() => Course, course => course.scores, { nullable: false })
    course!: Course;
}
