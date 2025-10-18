import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.Entity';

@Entity()
export class Testimonial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientName: string;

  @Column()
  clientTitle: string;

  @Column()
  clientCompany: string;

  @Column({
    type: 'text'
  })
  testimonialText: string;

  @Column({
    type: 'int',
    default: 5
  })
  rating: number;

  @Column({
    type: 'date'
  })
  testimonialDate: Date;

  @Column({
    nullable: true,
    default: null
  })
  projectName: string;

  @Column({
    nullable: true,
    default: null
  })
  clientEmail: string;

  @Column({
    nullable: true,
    default: null
  })
  clientPhoto: string;

  @Column({
    type: 'boolean',
    default: true
  })
  isPublic: boolean;

  @Column({
    type: 'boolean',
    default: false
  })
  isFeatured: boolean;

  @Column({
    type: 'json',
    nullable: true,
    default: null
  })
  tags: string[];

  @ManyToOne(() => User, user => user.testimonials)
  @JoinColumn()
  user: User;
}
