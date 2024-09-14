import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from "typeorm";
import { User } from "./User.Entity";
import { Technology } from "./Technology.Entity";
import { Media } from "./media.Entity";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @ManyToMany(
    () => Technology,
    (technology) => technology.projects
  )
  technologies: Technology[];

  @OneToMany(
    () => Media,
    media => media.project
  )
  media: Media[];
}