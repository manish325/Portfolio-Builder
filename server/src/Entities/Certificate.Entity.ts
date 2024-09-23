import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User.Entity';
import { Skill } from './Skill.Entity';
import { Technology } from './Technology.Entity';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn('uuid')
  certificateId: string;

  @ManyToOne(() => User, user => user.certificates) 
  user: User;

  @Column({ type: 'varchar', length: 255 })
  certificateName: string;

  @Column({ type: 'varchar', length: 255 })
  issuingOrganization: string;

  @Column({ type: 'date' })
  issueDate: Date;

  @Column({ type: 'date', nullable: true })
  expirationDate: Date;

  @Column({ type: 'json', nullable: true })
  credentialUrl: string [];

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['Technical', 'Management', 'Health', 'Other'],
    default: 'Technical',
  })
  type: string;

  @Column({
    type: 'enum',
    enum: ['Active', 'Expired', 'Revoked'],
    default: 'Active',
  })
  status: string;

  @ManyToMany(
    () => Skill,
    skill => skill.certificates
  )
  skills: Skill[]

  @ManyToMany(
    () => Technology,
    technology => technology.certificates
  )
  @JoinTable()
  technologies: Technology[];
}
