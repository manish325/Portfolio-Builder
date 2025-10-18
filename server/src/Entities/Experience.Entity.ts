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

    // Enhanced Experience Fields
    @Column({
        type : 'int',
        nullable : true,
        default : null
    })
    teamSizeManaged : number;

    @Column({
        nullable : true,
        default : null
    })
    budgetResponsibility : string;

    @Column({
        nullable : true,
        default : null
    })
    reportingTo : string;

    @Column({
        type : 'json',
        nullable : true,
        default : null
    })
    keyMetrics : string[];

    @Column({
        type : 'json',
        nullable : true,
        default : null
    })
    technologiesUsed : string[];

    @Column({
        nullable : true,
        default : null
    })
    clientCompanySize : string;

    @Column({
        type : 'boolean',
        default : false
    })
    isCurrentRole : boolean;

    @Column({
        type : 'json',
        nullable : true,
        default : null
    })
    projectsLed : string[];

    @Column({
        type : 'json',
        nullable : true,
        default : null
    })
    achievements : string[];

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