import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
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
    projects: Project[];

    @ManyToMany(
        () => Certificate,
        certificate => certificate.technologies
    )
    certificates: Certificate[];
}