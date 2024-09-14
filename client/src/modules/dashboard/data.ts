import { ILayout, IUserData } from "./types";

export const userData: IUserData = {
    id: "1a2b3c4d",
    name: "John Doe",
    email: "johndoe@example.com",
    profilePicture: " https://lh3.googleusercontent.com/a/ACg8ocJTE6ttbiOC4fCwLn2Dx4ZQaKEOqC30SyixYVbomlHfNYnu19o5=s96-c",
    phone: "+1234567890",
    profileSummary: "Full-stack developer with 5+ years of experience in developing web applications using MERN stack. Passionate about learning new technologies and delivering scalable solutions.",
  
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",

    location : 'pune',

    contactEmail : "ingalemanish7@gmail.com",
  
    education: [
      {
        school: "XYZ University",
        degree: "Bachelor of Science in Computer Science",
        fieldOfStudy: "Computer Science",
        startDate: "2015-09-01",
        endDate: "2019-05-15",
        location: "City, Country",
        description: "Graduated with honors, focusing on software development, algorithms, and data structures.",
      },
    ],
  
    experience: [
      {
        title: "Full Stack Developer",
        company: "Tech Solutions Inc.",
        location: "City, Country",
        startDate: "2020-01-01",
        endDate: "2023-09-01",
        description: "Developed web applications using MERN stack, integrated REST APIs, and worked on optimizing performance and scalability.",
      },
      {
        title: "Frontend Developer",
        company: "WebWorks",
        location: "City, Country",
        startDate: "2019-06-01",
        endDate: "2019-12-31",
        description: "Worked on various frontend projects using React, enhancing user experiences and implementing responsive designs.",
      },
    ],
  
    certifications: [
      {
        title: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2022-05-15",
        url: "https://aws.amazon.com/certification/certified-solutions-architect/",
        description: "Validated ability to design and implement scalable, reliable, and secure applications on AWS.",
      },
    ],
  
    languages: [
      { language: "English", proficiency: 5 },
      { language: "Spanish", proficiency: 3 },
    ],
  
    skills: [
      {
        id: "skill-1",
        title: "JavaScript",
        experience: 5,
        proficiency: 4,
        certificates: [
          {
            id: "cert-1",
            name: "JavaScript Mastery",
            issuingOrganization: "Coursera",
            issueDate: new Date("2021-07-01"),
            expirationDate: new Date("2024-07-01"),
            url: ["https://coursera.org/certificate/js-mastery"],
          },
        ],
      },
      {
        id: "skill-2",
        title: "React",
        experience: 3,
        proficiency: 4,
        certificates: [],
      },
    ],
  
    projects: [
      {
        id: "proj-1",
        name: "Portfolio Website",
        description: "A personal portfolio website to showcase projects, skills, and experiences.",
        startDate: "2022-01-01",
        endDate: "2022-02-01",
        media: ["https://example.com/portfolio-image.jpg"],
        technologies: [
          { 
            id: "tech-1",
            name: "React",
            certificates: []
          },
          { 
            id: "tech-2",
            name: "Node.js",
            certificates: []
          },
        ],
        skills: [
          {
            id: "skill-1",
            title: "JavaScript",
            experience: 5,
            proficiency: 4,
            certificates: [],
          },
        ],
      },
      {
        id: "proj-1",
        name: "Portfolio Website",
        description: "A personal portfolio website to showcase projects, skills, and experiences.",
        startDate: "2022-01-01",
        endDate: "2022-02-01",
        media: ["https://example.com/portfolio-image.jpg"],
        technologies: [
          { 
            id: "tech-1",
            name: "React",
            certificates: []
          },
          { 
            id: "tech-2",
            name: "Node.js",
            certificates: []
          },
        ],
        skills: [
          {
            id: "skill-1",
            title: "JavaScript",
            experience: 5,
            proficiency: 4,
            certificates: [],
          },
        ],
      },
    ],
  };

  export const layouts : ILayout[] = [
    {
      path : '/classic',
      title : 'Classic',
      image : 'https://cdn.textstudio.com/output/sample/normal/0/4/8/4/classic-logo-103-14840.png'
    },
    {
      path : '/creative',
      title : 'Creative',
      image : 'https://cdn.sanity.io/images/kts928pd/production/f20bdfda075258eafec330f21bf847b852bb064a-731x731.png'
    },
    {
      path : '/innovative',
      title : 'Innovative',
      image : 'data:image/png;base64,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'
    },
    {
      path : '/professional',
      title : 'Professional',
      image : 'data:image/png;base64,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'
    }
  ]
  