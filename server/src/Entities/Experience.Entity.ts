import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Skill } from "./Skill.Entity";
import { User } from "./User.Entity";

@Entity()
export class Experience {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({
        nullable : false
    })
    companyName : string;

    @Column({
        nullable : false
    })
    jobTitle : string;

    @Column({
        nullable : false
    })
    startDate : Date;

    @Column({
        nullable : false
    })
    endDate:  Date;

    @Column({
        nullable : false
    })
    jobDescription : string;

    @Column({
        nullable : true
    })
    keyAchievements : string;

    @Column()
    companyIndustry : string;

    @Column()
    location : string;

    @Column()
    employmentType : string;

    @ManyToMany(
        () => Skill,
        skill => skill.experiences
    )
    skills : Skill[];

    @ManyToOne(
        () => User,
        user => user.experiences
    )
    user : User;
}