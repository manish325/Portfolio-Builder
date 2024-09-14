import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Project } from "./Project.Entity";

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
        default : null
    })
    url: string;

    @Column({
        type: 'blob',
        nullable : false
    })
    data : Blob;

    @ManyToOne(
        () => Project,
        project => project.media,
    )
    project: Project;


}