import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.Entity';

@Entity()
export class SoftSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  skillName: string;

  @Column({
    type: 'int',
    default: 1
  })
  proficiencyLevel: number;

  @Column({
    type: 'text',
    nullable: true,
    default: null
  })
  description: string;

  @Column({
    type: 'json',
    nullable: true,
    default: null
  })
  examples: string[];

  @Column({
    type: 'boolean',
    default: false
  })
  isCoreSkill: boolean;

  @ManyToOne(() => User, user => user.softSkills)
  @JoinColumn()
  user: User;
}
