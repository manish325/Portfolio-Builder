import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany} from "typeorm";
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
    github : string;

    @Column({
        nullable : true,
        default : null
    })
    linkedin : string;

    @Column({
        nullable : true,
        default : null,
        type : 'json',
    })
    education : IEducation[];

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
    certifications : ICertification[];

    @Column({
        type : 'json',
        nullable : true,
        default : null
    })
    languages : ILanguage[];

    @OneToMany(
        () => Project,
        project => project.user
    )
    projects: Project[];

    @OneToMany(
        () => Skill,
        skill => skill.user
    )
    skills: Skill[];

    @OneToMany(
        () => Certificate,
        certificate => certificate.user
    )
    certificates: Certificate[];
}