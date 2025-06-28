import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.Entity";
import { Certificate } from "./Certificate.Entity";

@Entity()
export class Education {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    InstitutionName: string;

    @Column()
    Qualification: string;

    @Column()
    fieldOfStudy: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    grade: string;

    @Column()
    description: string;

    @Column()
    location: string;

    @Column()
    achievements: string;

    @ManyToMany(() => Certificate, certificate => certificate.educations)
    certificates: Certificate[];

    @ManyToOne(() => User, user => user.educations)
    user: User;
}