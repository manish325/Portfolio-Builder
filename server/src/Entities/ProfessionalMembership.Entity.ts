import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.Entity';

@Entity()
export class ProfessionalMembership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organizationName: string;

  @Column()
  membershipType: string;

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
    enum: ['Active', 'Inactive', 'Expired', 'Suspended'],
    default: 'Active'
  })
  status: string;

  @Column({
    nullable: true,
    default: null
  })
  membershipNumber: string;

  @Column({
    nullable: true,
    default: null
  })
  website: string;

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
  benefits: string[];

  @Column({
    type: 'boolean',
    default: false
  })
  isLeadershipRole: boolean;

  @Column({
    nullable: true,
    default: null
  })
  leadershipPosition: string;

  @ManyToOne(() => User, user => user.professionalMemberships)
  @JoinColumn()
  user: User;
}
