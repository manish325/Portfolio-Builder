import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.Entity';

@Entity()
export class BoardPosition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organizationName: string;

  @Column()
  positionTitle: string;

  @Column({
    type: 'date'
  })
  startDate: Date;

  @Column({
    type: 'date',
    nullable: true,
    default: null
  })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: ['Active', 'Past', 'Advisory'],
    default: 'Active'
  })
  status: string;

  @Column()
  organizationType: string;

  @Column({
    nullable: true,
    default: null
  })
  organizationSize: string;

  @Column({
    type: 'text',
    nullable: true,
    default: null
  })
  responsibilities: string;

  @Column({
    type: 'json',
    nullable: true,
    default: null
  })
  keyAchievements: string[];

  @Column({
    nullable: true,
    default: null
  })
  website: string;

  @Column({
    type: 'boolean',
    default: false
  })
  isCompensated: boolean;

  @Column({
    nullable: true,
    default: null
  })
  compensation: string;

  @ManyToOne(() => User, user => user.boardPositions)
  @JoinColumn()
  user: User;
}
