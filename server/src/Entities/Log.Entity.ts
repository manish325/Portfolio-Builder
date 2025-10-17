import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum LogLevel {
    INFO = 'info',
    DEBUG = 'debug',
    ERROR = 'error'
}

@Entity({ name: 'log' })
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: LogLevel })
    level: LogLevel;

    @Column({ type: 'varchar', length: 255, nullable: true })
    context?: string;

    @Column({ type: 'text' })
    message: string;

    @Column({ type: 'json', nullable: true })
    meta?: any;

    @CreateDateColumn()
    createdAt: Date;
}




