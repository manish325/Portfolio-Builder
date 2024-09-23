import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificate } from 'src/Entities/Certificate.Entity';
import { Media } from 'src/Entities/media.Entity';
import { Project } from 'src/Entities/Project.Entity';
import { Skill } from 'src/Entities/Skill.Entity';
import { Technology } from 'src/Entities/Technology.Entity';
import { User } from 'src/Entities/User.Entity';
import { Repository } from 'typeorm';
import { IEducation, IExperience, ILanguage } from '../types';

@Injectable()
export class UserSeederService implements OnModuleInit {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
    @InjectRepository(Certificate) private certificateRepository: Repository<Certificate>,
    @InjectRepository(Technology) private technologyRepository: Repository<Technology>,
    @InjectRepository(Media) private mediaRepository: Repository<Media>,
  ) {}

  async onModuleInit() {
    console.log('Creating default user...');
    const alreadyDefaultUser = await this.userRepository.findOne({ where: { email: 'default@gmail.com' } })
    if (!alreadyDefaultUser) {
        console.log('No default user found, creating one...')
        console.log(alreadyDefaultUser);
      return await this.createDefaultUser();
    }
  }

//   async createDefaultUser() {
//     const user = this.userRepository.create({
//       name: 'Default User',
//       email: 'default@gmail.com',
//       password: '$2b$10$YIpAfbhoHzUQjc6N/jSlROWbLHLRJ9ncYG6OsbfSOVShVdnLedeNW',
//       phone: '1234567890',
//       profilePicture: 'https://pbs.twimg.com/profile_images/1354154947630292993/nGzZq5MN_400x400.jpg',
//       profileSummary: 'This is a default user profile.',
//       github: 'https://github.com/default',
//       linkedin: 'https://linkedin.com/in/default',
//       education: [
//         {
//           school: 'Default University',
//           degree: 'Bachelor of Science',
//           fieldOfStudy: 'Computer Science',
//           startDate: '2018-01-01',
//           endDate: '2022-01-01',
//           location: 'Default Location',
//           description: 'Studied Computer Science.',
//         },
//       ] as IEducation[],
//       experience: [
//         {
//           title: 'Software Developer',
//           company: 'Default Company',
//           location: 'Default Location',
//           startDate: '2022-01-01',
//           endDate: '2023-01-01',
//           description: 'Worked as a software developer.',
//         },
//       ] as IExperience[],
//       languages: [
//         {
//           language: 'English',
//           proficiency: 5,
//         },
//       ] as ILanguage[],
//       country: 'Country Name',
//     });

//     try {
//       await this.userRepository.save(user);
//       console.log('Default user created successfully');
//     } catch (error) {
//       console.error('Error creating user:', error);
//     }
//   }

async createDefaultUser() {
    const user = this.userRepository.create({
        name: 'Default User',
        email: 'default@gmail.com',
        password: '$2b$10$YIpAfbhoHzUQjc6N/jSlROWbLHLRJ9ncYG6OsbfSOVShVdnLedeNW',
        phone: '1234567890',
        profilePicture: 'https://pbs.twimg.com/profile_images/1354154947630292993/nGzZq5MN_400x400.jpg',
        profileSummary: 'This is a default user profile.',
        github: 'https://github.com/default',
        linkedin: 'https://linkedin.com/in/default',
        country: 'Country Name',
    });

    // Save the user first
    const savedUser = await this.userRepository.save(user);

    // Create and save skills
    const skills = [
        { title: 'JavaScript', experience: 5, proficiency: 4, is_active: true },
        { title: 'TypeScript', experience: 3, proficiency: 3, is_active: true },
    ];
    
    const savedSkills = await this.skillRepository.save(skills.map(skill => this.skillRepository.create({ ...skill, users: [savedUser] })));

    // Create and save projects
    const project = this.projectRepository.create({
        name: 'Default Project',
        description: 'A sample project for demonstration.',
        startDate: new Date('2022-01-01'),
        endDate: new Date('2022-06-01'),
        githubLink: 'https://github.com/default/project',
        liveLink: 'https://example.com/project',
        user: savedUser,
    });

    const savedProject = await this.projectRepository.save(project);

    // Create and save media
    const media = this.mediaRepository.create({
        url: 'http://example.com/image.jpg',
        data:new Blob(),
        project: savedProject,
    });
    await this.mediaRepository.save(media);

    // Create and save certificates
    const certificate = this.certificateRepository.create({
        certificateName: 'Certified Developer',
        issuingOrganization: 'Default Institute',
        issueDate: new Date('2022-07-01'),
        expirationDate: new Date('2022-07-01'),
        credentialUrl: ['http://example.com/credential'],
        description: 'This is a sample certificate.',
        type: 'Technical',
        status: 'Active',
        user: savedUser,
        skills: savedSkills,
    });
    await this.certificateRepository.save(certificate);

    // Update user with education, experience, and languages
    const education = {
        school: 'Default University',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        startDate: new Date('2018-01-01').toDateString(),
        endDate: new Date('2022-01-01').toDateString(),
        location: 'Default Location',
        description: 'Studied Computer Science.',
    };

    const experience = {
        title: 'Software Developer',
        company: 'Default Company',
        location: 'Default Location',
        startDate: new Date('2022-01-01').toDateString(),
        endDate: new Date('2023-01-01').toDateString(),
        description: 'Worked as a software developer.',
    };

    const languages = [
        { language: 'English', proficiency: 5 },
    ];

    // Update the saved user with new values
    savedUser.education = [education];
    savedUser.experience = [experience];
    savedUser.languages = languages;

    // Save the updated user with all related data
    await this.userRepository.update(savedUser.id, {
        education : [education],
        experience: [experience],
        languages: languages,
    });

    console.log('Default user created successfully with all related data');
}



}
