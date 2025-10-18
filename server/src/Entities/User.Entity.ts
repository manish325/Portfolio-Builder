import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, ManyToMany, JoinColumn, JoinTable} from "typeorm";
import {
    isNotEmpty,
    isEmail,
    MinLength,
    IsString

} from "class-validator"
import { Project } from "./Project.Entity";
import { Skill } from "./Skill.Entity";
import { ICertification, IEducation, ILanguage } from "src/common/types";
import { Certificate } from "./Certificate.Entity";
import { Language } from "./Language.Entity";
import { UserLanguage } from "./UserLanguage.Entity";
import { Portfolio } from "./Portfolio.Entity";
import { Education } from "./Education.Entity";
import { Experience } from "./Experience.Entity";
import { ProfessionalReference } from "./ProfessionalReference.Entity";
import { Achievement } from "./Achievement.Entity";
import { Publication } from "./Publication.Entity";
import { SpeakingEngagement } from "./SpeakingEngagement.Entity";
import { ProfessionalMembership } from "./ProfessionalMembership.Entity";
import { Testimonial } from "./Testimonial.Entity";
import { BusinessVenture } from "./BusinessVenture.Entity";
import { BoardPosition } from "./BoardPosition.Entity";
import { SoftSkill } from "./SoftSkill.Entity";

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

    // Enhanced Professional Fields
    @Column({
        nullable : true,
        default : null
    })
    twitter : string;

    @Column({
        nullable : true,
        default : null
    })
    website : string;

    @Column({
        nullable : true,
        default : null
    })
    behance : string;

    @Column({
        nullable : true,
        default : null
    })
    dribbble : string;

    @Column({
        nullable : true,
        default : null
    })
    professionalSummary : string;

    @Column({
        nullable : true,
        default : null
    })
    careerObjective : string;

    @Column({
        nullable : true,
        default : null
    })
    industry : string;

    @Column({
        nullable : true,
        default : null
    })
    specialization : string;

    @Column({
        type : 'int',
        nullable : true,
        default : null
    })
    totalExperienceYears : number;

    @Column({
        type : 'enum',
        enum: ['Entry', 'Mid', 'Senior', 'Executive', 'C-Level'],
        nullable : true,
        default : null
    })
    careerLevel : string;

    @Column({
        nullable : true,
        default : null
    })
    salaryExpectation : string;

    @Column({
        type : 'enum',
        enum: ['Open to work', 'Not looking', 'Actively seeking', 'Open to opportunities'],
        nullable : true,
        default : 'Open to opportunities'
    })
    availabilityStatus : string;

    @Column({
        type : 'json',
        nullable : true,
        default : null
    })
    preferredWorkLocations : string[];

    @Column({
        type : 'enum',
        enum: ['Remote', 'Onsite', 'Hybrid'],
        nullable : true,
        default : null
    })
    workPreference : string;

    @Column({
        type : 'boolean',
        default : false
    })
    relocationOpen : boolean;

    @Column({
        nullable : true,
        default : null
    })
    timeZone : string;

    @OneToMany(() => Education, education => education.user)
    educations : Education[];


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

    // New Professional Relationships
    @OneToMany(() => ProfessionalReference, reference => reference.user)
    @JoinColumn()
    references: ProfessionalReference[];

    @OneToMany(() => Achievement, achievement => achievement.user)
    @JoinColumn()
    achievements: Achievement[];

    @OneToMany(() => Publication, publication => publication.user)
    @JoinColumn()
    publications: Publication[];

    @OneToMany(() => SpeakingEngagement, speaking => speaking.user)
    @JoinColumn()
    speakingEngagements: SpeakingEngagement[];

    @OneToMany(() => ProfessionalMembership, membership => membership.user)
    @JoinColumn()
    professionalMemberships: ProfessionalMembership[];

    @OneToMany(() => Testimonial, testimonial => testimonial.user)
    @JoinColumn()
    testimonials: Testimonial[];

    @OneToMany(() => BusinessVenture, venture => venture.user)
    @JoinColumn()
    businessVentures: BusinessVenture[];

    @OneToMany(() => BoardPosition, boardPosition => boardPosition.user)
    @JoinColumn()
    boardPositions: BoardPosition[];

    @OneToMany(() => SoftSkill, softSkill => softSkill.user)
    @JoinColumn()
    softSkills: SoftSkill[];
}