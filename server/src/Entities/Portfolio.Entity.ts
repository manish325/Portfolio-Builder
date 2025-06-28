import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.Entity";

@Entity()
export class Portfolio {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title : string;

    @Column()
    description : string;

    @Column()
    code : string;

    @ManyToOne(() => User, user => user.portfolios)
    user : User;

}