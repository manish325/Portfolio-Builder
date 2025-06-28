import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, ManyToMany, JoinColumn, JoinTable} from "typeorm";
import {
    isNotEmpty,
    isEmail,
    MinLength,
    IsString

} from "class-validator"
import { Project } from "./Project.Entity";
import { Skill } from "./Skill.Entity";
import { ICertification, IEducation, IExperience, ILanguage } from "src/common/types";
import { Certificate } from "./Certificate.Entity";
import { Language } from "./Language.Entity";
import { UserLanguage } from "./UserLanguage.Entity";
import { Portfolio } from "./Portfolio.Entity";
import { Education } from "./Education.Entity";
import { Experience } from "./Experience.Entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unique : true
    })
    email: string;

    @Column({
        type : 'text',
        nullable : true,
        default : null
    })
    password : string;

    @Column({
        type : 'varchar',
        unique : true,
        nullable : true,
        default : null
    })
    phone : string;

    @Column({
        type : 'text',
        nullable : true,
        default : null
    })
    profilePicture : string;

    @Column({
        nullable : true,
        default : null
    })
    profileSummary : string;

    @Column({
        nullable : true,
        default : null
    })
    github : string;

    @Column({
        nullable : true,
        default : null
    })
    linkedin : string;

    @OneToMany(() => Education, education => education.user)
    educations : Education[];

    @Column({
        nullable : true,
        default : null,
        type : 'json',
    })
    experience : IExperience[];

    @Column({
        type : 'json',
        nullable : true,
        default : null
    })
    languages : ILanguage[];

    @Column({
        nullable : true,
        default : null
    })
    country : string;

    @OneToMany(
        () => Project,
        project => project.user
    )
    @JoinColumn()
    projects: Project[];

    @ManyToMany(
        () => Skill,
        skill => skill.users
    )
    skills: Skill[];

    @OneToMany(
        () => Certificate,
        certificate => certificate.user
    )
    @JoinColumn()
    certificates: Certificate[];

    @OneToMany(() => UserLanguage, (userLanguage) => userLanguage.user)
    userLanguages: UserLanguage[];

    @OneToMany(() => Portfolio, portfolio => portfolio.user)
    @JoinColumn()
    portfolios: Portfolio[];

    @OneToMany(
        () => Experience,
        experience => experience.user
    )
    @JoinColumn()
    experiences: Experience[];
}