import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.Entity';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'text'
  })
  description: string;

  @Column({
    type: 'date'
  })
  achievementDate: Date;

  @Column({
    type: 'enum',
    enum: ['Professional', 'Academic', 'Personal', 'Award', 'Recognition'],
    default: 'Professional'
  })
  category: string;

  @Column({
    nullable: true,
    default: null
  })
  organization: string;

  @Column({
    nullable: true,
    default: null
  })
  awardLevel: string;

  @Column({
    type: 'json',
    nullable: true,
    default: null
  })
  metrics: string[];

  @Column({
    nullable: true,
    default: null
  })
  certificateUrl: string;

  @Column({
    type: 'boolean',
    default: false
  })
  isPublic: boolean;

  @ManyToOne(() => User, user => user.achievements)
  @JoinColumn()
  user: User;
}
