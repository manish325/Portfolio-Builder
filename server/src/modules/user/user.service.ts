import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Certificate } from "src/Entities/Certificate.Entity";
import { Project } from "src/Entities/Project.Entity";
import { Skill } from "src/Entities/Skill.Entity";
import { User } from "src/Entities/User.Entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async getUserData(userId: number) {
        console.log("Logging the userId : ", userId)
        // return await this.userRepository.findOne({
        //     where: {
        //         id: userId
        //     },
        //     loadEagerRelations: true,
        //     relations: ["projects", "skills", "certificates"]
        // });
        const user = await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.skills', 'skill')
            .leftJoinAndSelect('skill.certificates', 'skillCertificate')
            .leftJoinAndSelect('user.certificates', 'certificate')
            .leftJoinAndSelect('certificate.skills', 'certificateSkill')
            .leftJoinAndSelect('certificate.technologies', 'certificateTechnology')
            .leftJoinAndSelect('user.projects', 'project')
            .leftJoinAndSelect('project.technologies', 'projectTechnology')
            // .leftJoinAndSelect('project.skills', 'projectSkill')
            .leftJoinAndSelect('project.media', 'projectMedia')
            .where('user.id = :userId', { userId })  // Filter for specific userId
            .getOne();
        return user;
    }
}