import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.Entity';

@Entity()
export class SpeakingEngagement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventName: string;

  @Column()
  eventType: string;

  @Column()
  topic: string;

  @Column({
    type: 'text'
  })
  description: string;

  @Column({
    type: 'date'
  })
  eventDate: Date;

  @Column()
  location: string;

  @Column({
    nullable: true,
    default: null
  })
  organizer: string;

  @Column({
    type: 'int',
    nullable: true,
    default: null
  })
  audienceSize: number;

  @Column({
    nullable: true,
    default: null
  })
  duration: string;

  @Column({
    nullable: true,
    default: null
  })
  presentationUrl: string;

  @Column({
    nullable: true,
    default: null
  })
  videoUrl: string;

  @Column({
    type: 'json',
    nullable: true,
    default: null
  })
  tags: string[];

  @Column({
    type: 'boolean',
    default: false
  })
  isKeynote: boolean;

  @ManyToOne(() => User, user => user.speakingEngagements)
  @JoinColumn()
  user: User;
}
