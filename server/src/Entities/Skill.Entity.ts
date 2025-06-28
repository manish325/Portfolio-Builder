import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, OneToMany } from "typeorm";
import { User } from "./User.Entity";
import { Certificate } from "./Certificate.Entity";
import { Experience } from "./Experience.Entity";
import { UserSkill } from "./UserSkill.Entity";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;


  @Column()
  is_active: boolean;

  @ManyToMany(
    () => User,
    user => user.skills
  )
  @JoinTable()
  users: User[];

  @ManyToMany(
    () => Certificate,
    certificate => certificate.skills
  )
  @JoinTable()
  certificates: Certificate[];

  @ManyToMany(
    () => Experience,
    experience => experience.skills
  )
  @JoinTable()
  experiences: Experience[];

  @OneToMany(() => UserSkill, (userSkill) => userSkill.skill)
  userSkills: UserSkill[];
}