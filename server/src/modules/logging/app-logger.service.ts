import { Injectable, LoggerService } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Log, LogLevel } from "src/Entities/Log.Entity";

@Injectable()
export class AppLoggerService implements LoggerService {
    constructor(
        @InjectRepository(Log) private readonly logRepo: Repository<Log>
    ) {}

    log(message: any, context?: string) {
        this.persist(LogLevel.INFO, message, context);
        // Also print to console for local visibility
        // eslint-disable-next-line no-console
        console.log(this.format('INFO', message, context));
    }

    error(message: any, trace?: string, context?: string) {
        this.persist(LogLevel.ERROR, trace ? `${message} :: ${trace}` : message, context);
        // eslint-disable-next-line no-console
        console.error(this.format('ERROR', message, context), trace);
    }

    warn(message: any, context?: string) {
        // Map warn to info for now
        this.persist(LogLevel.INFO, message, context);
        // eslint-disable-next-line no-console
        console.warn(this.format('WARN', message, context));
    }

    debug?(message: any, context?: string) {
        this.persist(LogLevel.DEBUG, message, context);
        // eslint-disable-next-line no-console
        console.debug(this.format('DEBUG', message, context));
    }

    verbose?(message: any, context?: string) {
        this.persist(LogLevel.DEBUG, message, context);
        // eslint-disable-next-line no-console
        console.debug(this.format('VERBOSE', message, context));
    }

    private async persist(level: LogLevel, message: any, context?: string) {
        try {
            const entry = this.logRepo.create({ level, message: String(message), context });
            await this.logRepo.save(entry);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Failed to persist log', e);
        }
    }

    private format(level: string, message: any, context?: string) {
        const ctx = context ? `[${context}] ` : '';
        return `${new Date().toISOString()} ${level} ${ctx}${message}`;
    }
}




