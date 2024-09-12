import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User.entity';

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

  @Column({ type: 'varchar', length: 255, nullable: true })
  credentialId: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  credentialUrl: string;

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
}
