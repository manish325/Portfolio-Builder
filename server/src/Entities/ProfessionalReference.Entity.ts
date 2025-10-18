import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.Entity';

@Entity()
export class ProfessionalReference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  referenceName: string;

  @Column()
  referenceTitle: string;

  @Column()
  referenceCompany: string;

  @Column()
  referenceEmail: string;

  @Column({
    nullable: true,
    default: null
  })
  referencePhone: string;

  @Column({
    nullable: true,
    default: null
  })
  relationship: string;

  @Column({
    type: 'text',
    nullable: true,
    default: null
  })
  recommendation: string;

  @Column({
    type: 'boolean',
    default: false
  })
  canContact: boolean;

  @Column({
    type: 'date',
    nullable: true,
    default: null
  })
  lastContactDate: Date;

  @ManyToOne(() => User, user => user.references)
  @JoinColumn()
  user: User;
}
