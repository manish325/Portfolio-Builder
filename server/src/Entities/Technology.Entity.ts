import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Project } from "./Project.Entity";
import { Certificate } from "./Certificate.Entity";

@Entity()
export class Technology {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    techName: string;

    @ManyToMany(
        () => Project,
        (project) => project.technologies
    )
    @JoinTable()
    projects: Project[];

    @ManyToMany(
        () => Certificate,
        certificate => certificate.technologies
    )
    certificates: Certificate[];
}