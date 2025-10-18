import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from "typeorm";
import { User } from "./User.Entity";
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

  @Column({
    nullable : true,
    default : null
  })
  githubLink: string;

  @Column({
    nullable : true,
    default : null
  })
  liveLink : string;

  // Enhanced Project Fields
  @Column({
    type : 'enum',
    enum: ['Web Development', 'Mobile App', 'Desktop App', 'Design', 'Research', 'Other'],
    default : 'Web Development'
  })
  projectType : string;

  @Column({
    type : 'enum',
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default : 'Intermediate'
  })
  complexityLevel : string;

  @Column({
    type : 'int',
    nullable : true,
    default : null
  })
  teamSize : number;

  @Column({
    nullable : true,
    default : null
  })
  clientName : string;

  @Column({
    nullable : true,
    default : null
  })
  projectStatus : string;

  @Column({
    type : 'json',
    nullable : true,
    default : null
  })
  projectTags : string[];

  @Column({
    type : 'json',
    nullable : true,
    default : null
  })
  keyFeatures : string[];

  @Column({
    nullable : true,
    default : null
  })
  caseStudy : string;

  @Column({
    type : 'json',
    nullable : true,
    default : null
  })
  testimonials : string[];

  @Column({
    type : 'boolean',
    default : false
  })
  isFeatured : boolean;

  @Column({
    type : 'int',
    default : 0
  })
  priority : number;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(
    () => Media,
    media => media.project
  )
  media: Media[];
}