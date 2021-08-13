import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Score } from "./Score";

@ObjectType()
@Entity()
export class Course extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column({ unique: true})
    name!: string;

    @Field()
    @Column()
    par1!: number;

    @Field()
    @Column()
    par2!: number;

    @Field()
    @Column()
    par3!: number;

    @Field()
    @Column()
    par4!: number;

    @Field()
    @Column()
    par5!: number;

    @Field()
    @Column()
    par6!: number;

    @Field()
    @Column()
    par7!: number;

    @Field()
    @Column()
    par8!: number;

    @Field()
    @Column()
    par9!: number;

    @Field()
    @Column()
    par10!: number;

    @Field()
    @Column()
    par11!: number;

    @Field()
    @Column()
    par12!: number;

    @Field()
    @Column()
    par13!: number;

    @Field()
    @Column()
    par14!: number;

    @Field()
    @Column()
    par15!: number;

    @Field()
    @Column()
    par16!: number;

    @Field()
    @Column()
    par17!: number;

    @Field()
    @Column()
    par18!: number;

    @Field()
    @Column()
    hdc1: number;

    @Field()
    @Column()
    hdc2: number;

    @Field()
    @Column()
    hdc3: number;

    @Field()
    @Column()
    hdc4: number;

    @Field()
    @Column()
    hdc5: number;

    @Field()
    @Column()
    hdc6: number;

    @Field()
    @Column()
    hdc7: number;

    @Field()
    @Column()
    hdc8: number;

    @Field()
    @Column()
    hdc9: number;

    @Field()
    @Column()
    hdc10: number;

    @Field()
    @Column()
    hdc11: number;

    @Field()
    @Column()
    hdc12: number;

    @Field()
    @Column()
    hdc13: number;

    @Field()
    @Column()
    hdc14: number;

    @Field()
    @Column()
    hdc15: number;

    @Field()
    @Column()
    hdc16: number;

    @Field()
    @Column()
    hdc17: number;

    @Field()
    @Column()
    hdc18: number;

    @OneToMany(() => Score, score => score.course)
    scores: Score[];
}