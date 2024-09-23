import { Module } from "@nestjs/common";
import { ProjectController } from "./project.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "src/Entities/Project.Entity";
import { ConfigModule } from "@nestjs/config";
import { ProjectService } from "./project.service";

@Module({
    imports : [
        TypeOrmModule.forFeature(([Project])),
        ConfigModule,

    ],
    controllers : [ProjectController],
    providers : [ProjectService],
    exports :[]
})
export class ProjectModule {
    
}