import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.Entity';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'text'
  })
  abstract: string;

  @Column()
  publicationType: string;

  @Column({
    nullable: true,
    default: null
  })
  journalName: string;

  @Column({
    nullable: true,
    default: null
  })
  publisher: string;

  @Column({
    type: 'date'
  })
  publicationDate: Date;

  @Column({
    nullable: true,
    default: null
  })
  doi: string;

  @Column({
    nullable: true,
    default: null
  })
  url: string;

  @Column({
    type: 'json',
    nullable: true,
    default: null
  })
  coAuthors: string[];

  @Column({
    type: 'json',
    nullable: true,
    default: null
  })
  keywords: string[];

  @Column({
    type: 'int',
    nullable: true,
    default: null
  })
  citationCount: number;

  @Column({
    type: 'boolean',
    default: false
  })
  isPeerReviewed: boolean;

  @ManyToOne(() => User, user => user.publications)
  @JoinColumn()
  user: User;
}
