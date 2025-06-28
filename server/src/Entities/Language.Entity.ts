import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserLanguage } from "./UserLanguage.Entity";

@Entity()
export class Language {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => UserLanguage, (userLanguage) => userLanguage.language)
    userLanguages: UserLanguage[];
}