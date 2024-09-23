import { Inject, Injectable } from "@nestjs/common";
import { Project } from "src/Entities/Project.Entity";
import { Repository } from "typeorm";

@Injectable()
export class ProjectService {
    
    constructor(@Inject() private readonly projectRepository: Repository<Project>) {}
}