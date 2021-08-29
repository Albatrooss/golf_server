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

    @Column()
    par1!: number;

    @Column()
    par2!: number;

    @Column()
    par3!: number;

    @Column()
    par4!: number;

    @Column()
    par5!: number;

    @Column()
    par6!: number;

    @Column()
    par7!: number;

    @Column()
    par8!: number;

    @Column()
    par9!: number;

    @Column()
    par10!: number;

    @Column()
    par11!: number;

    @Column()
    par12!: number;

    @Column()
    par13!: number;

    @Column()
    par14!: number;

    @Column()
    par15!: number;

    @Column()
    par16!: number;

    @Column()
    par17!: number;

    @Column()
    par18!: number;

    @Column()
    hdc1: number;

    @Column()
    hdc2: number;

    @Column()
    hdc3: number;

    @Column()
    hdc4: number;

    @Column()
    hdc5: number;

    @Column()
    hdc6: number;

    @Column()
    hdc7: number;

    @Column()
    hdc8: number;

    @Column()
    hdc9: number;

    @Column()
    hdc10: number;

    @Column()
    hdc11: number;

    @Column()
    hdc12: number;

    @Column()
    hdc13: number;

    @Column()
    hdc14: number;

    @Column()
    hdc15: number;

    @Column()
    hdc16: number;

    @Column()
    hdc17: number;

    @Column()
    hdc18: number;

    @OneToMany(() => Score, score => score.course)
    scores: Score[];
}