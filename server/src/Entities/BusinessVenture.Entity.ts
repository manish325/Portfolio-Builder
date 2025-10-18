import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.Entity';

@Entity()
export class BusinessVenture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ventureName: string;

  @Column()
  ventureType: string;

  @Column({
    type: 'text'
  })
  description: string;

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
    enum: ['Active', 'Inactive', 'Sold', 'Closed', 'Acquired'],
    default: 'Active'
  })
  status: string;

  @Column({
    nullable: true,
    default: null
  })
  website: string;

  @Column({
    nullable: true,
    default: null
  })
  industry: string;

  @Column({
    type: 'int',
    nullable: true,
    default: null
  })
  teamSize: number;

  @Column({
    nullable: true,
    default: null
  })
  fundingAmount: string;

  @Column({
    nullable: true,
    default: null
  })
  revenue: string;

  @Column({
    type: 'json',
    nullable: true,
    default: null
  })
  keyMetrics: string[];

  @Column({
    type: 'json',
    nullable: true,
    default: null
  })
  technologies: string[];

  @Column({
    type: 'text',
    nullable: true,
    default: null
  })
  lessonsLearned: string;

  @ManyToOne(() => User, user => user.businessVentures)
  @JoinColumn()
  user: User;
}
