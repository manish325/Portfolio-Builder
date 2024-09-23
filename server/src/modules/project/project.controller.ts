import { Controller, Get, Param } from "@nestjs/common";
import { ProjectService } from "./project.service";

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    
}