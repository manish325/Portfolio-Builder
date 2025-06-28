import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Skill } from './Skill.Entity';
import { User } from './User.Entity';

@Entity()
export class UserSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.skills, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Skill, (skill) => skill.userSkills, { onDelete: 'CASCADE' })
  skill: Skill;

  @Column({ type: 'int' }) // Can be 1-5, percentage, etc.
  proficiency: number;
}
