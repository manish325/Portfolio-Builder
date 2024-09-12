import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  level: number;

  @Column()
  experience: number;

  @Column()
  proficiency: number;

  @Column()
  is_active: boolean;

  @ManyToOne(
    () => User,
    user => user.skills
  )
  user : User;
}