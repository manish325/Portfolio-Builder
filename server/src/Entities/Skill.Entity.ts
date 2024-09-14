import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, OneToMany } from "typeorm";
import { User } from "./User.Entity";
import { Certificate } from "./Certificate.Entity";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  experience: number;

  @Column()
  proficiency: number;

  @Column()
  is_active: boolean;

  @ManyToMany(
    () => User,
    user => user.skills
  )
  @JoinTable()
  users : User[];

  @ManyToMany(
    () => Certificate,
    certificate => certificate.skills
  )
  @JoinTable()
  certificates : Certificate[];
}