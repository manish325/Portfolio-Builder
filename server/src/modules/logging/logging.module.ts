import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Log } from "src/Entities/Log.Entity";
import { AppLoggerService } from "./app-logger.service";

@Module({
    imports: [TypeOrmModule.forFeature([Log])],
    providers: [AppLoggerService],
    exports: [AppLoggerService]
})
export class LoggingModule {}




