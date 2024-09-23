import { Certificate } from "src/Entities/Certificate.Entity";
import { Media } from "src/Entities/media.Entity";
import { Project } from "src/Entities/Project.Entity";
import { Skill } from "src/Entities/Skill.Entity";
import { Technology } from "src/Entities/Technology.Entity";
import { User } from "src/Entities/User.Entity";
import { getConnection } from "typeorm";

export async function createUser() {
  await getConnection().transaction(async (manager) => {
    // Create technologies
    const tech1 = new Technology();
    tech1.techName = "JavaScript";

    const tech2 = new Technology();
    tech2.techName = "TypeScript";

    await manager.save([tech1, tech2]);

    // Create skills
    const skill1 = new Skill();
    skill1.title = "Frontend Development";
    skill1.experience = 3;
    skill1.proficiency = 4;
    skill1.is_active = true;

    const skill2 = new Skill();
    skill2.title = "Backend Development";
    skill2.experience = 2;
    skill2.proficiency = 3;
    skill2.is_active = true;

    await manager.save([skill1, skill2]);

    // Create media
    const media = new Media();
    media.url = "http://example.com/image.jpg";
    media.data = new Blob(); // Placeholder for actual data

    await manager.save(media);

    // Create project
    const project = new Project();
    project.name = "E-commerce Application";
    project.description = "A full-stack e-commerce web application";
    project.startDate = new Date("2022-01-01");
    project.endDate = new Date("2022-12-31");
    project.githubLink = "https://github.com/example/project";
    project.liveLink = "https://example.com";
    project.technologies = [tech1, tech2]; // Link technologies
    project.media = [media]; // Link media

    await manager.save(project);

    // Create certificate
    const certificate = new Certificate();
    certificate.certificateName = "Full Stack Development";
    certificate.issuingOrganization = "Coursera";
    certificate.issueDate = new Date("2021-01-01");
    certificate.expirationDate = new Date("2024-01-01");
    certificate.credentialUrl = ["https://coursera.org/certificate/example"];
    certificate.description = "Certified in Full Stack Development";
    certificate.type = "Technical";
    certificate.status = "Active";
    certificate.skills = [skill1, skill2]; // Link skills
    certificate.technologies = [tech1, tech2]; // Link technologies

    await manager.save(certificate);

    // Create the user using provided types
    const user = new User();
    user.name = "John Doe";
    user.email = "john.doe@example.com";
    user.password = "hashed_password_here";
    user.phone = "+1234567890";
    user.profilePicture = "http://example.com/profile.jpg";
    user.profileSummary = "Experienced full-stack developer";
    user.github = "https://github.com/johndoe";
    user.linkedin = "https://linkedin.com/in/johndoe";

    // Education JSON (IEducation interface)
    user.education = [
      {
        school: "University of Example",
        degree: "BSc Computer Science",
        fieldOfStudy: "Computer Science",
        startDate: "2015-09-01",
        endDate: "2019-06-30",
        location: "City, Country",
        description: "Studied various subjects including algorithms, databases, and web development.",
      },
    ];

    // Experience JSON (IExperience interface)
    user.experience = [
      {
        title: "Full Stack Developer",
        company: "Example Inc",
        location: "City, Country",
        startDate: "2020-01-01",
        endDate: "2022-12-31",
        description: "Worked on full-stack applications using MERN stack.",
      },
    ];

    // Languages JSON (ILanguage interface)
    user.languages = [
      { language: "English", proficiency: 5 }, // Proficiency scale: 1-5
      { language: "Spanish", proficiency: 3 },
    ];

    user.country = "USA";
    user.projects = [project]; // Link project
    user.skills = [skill1, skill2]; // Link skills
    user.certificates = [certificate]; // Link certificate

    await manager.save(user);
  });
}
