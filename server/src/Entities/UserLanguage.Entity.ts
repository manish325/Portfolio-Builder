import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User.Entity";
import { Language } from "./Language.Entity";

@Entity()
export class UserLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Language, (language) => language.userLanguages)
  language: Language;

  @Column( {
    nullable : false
  })
  level: number;

  @ManyToOne(() => User, (user) => user.userLanguages)
  user: User;
}
