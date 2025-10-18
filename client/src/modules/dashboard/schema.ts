import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

export const basicDetailsFormGrourp = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.minLength(2)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    phone : new FormControl('', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]),
    profilePicture : new FormControl(),
    address : new FormControl(''),
    country : new FormControl(''),
    profileSummary : new FormControl('', [Validators.maxLength(500)]),
});

export const languageSchema = new FormGroup({
    language : new FormControl('', [Validators.required]),
    proficiency : new FormControl('', [Validators.required])
})

export const socialLinksFormGrourp = new FormGroup({
    github : new FormControl('', [Validators.pattern(/^https?:\/\/github\.com\/[a-zA-Z0-9_-]+$/)]),
    linkedin : new FormControl('', [Validators.pattern(/^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/)]),
    twitter : new FormControl('', [Validators.pattern(/^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+$/)]),
    website : new FormControl('', [Validators.pattern(/^https?:\/\/.+/)]),
    behance : new FormControl('', [Validators.pattern(/^https?:\/\/(www\.)?behance\.net\/[a-zA-Z0-9_-]+$/)]),
    dribbble : new FormControl('', [Validators.pattern(/^https?:\/\/(www\.)?dribbble\.com\/[a-zA-Z0-9_-]+$/)])
})

export const educationDetailsFormGrourp = new FormGroup({
    school: new FormControl(''),
    degree: new FormControl(''),
    fieldOfStudy: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    location: new FormControl(''),
    description: new FormControl('')
});

export const experienceDetailsFormGrourp = new FormGroup({
    title: new FormControl(''),
    company: new FormControl(''),
    location: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    description: new FormControl('')
})

export const userProfileSchema = new FormGroup({
    basicDetails : basicDetailsFormGrourp,
    socialLinks : socialLinksFormGrourp,
    educationDetails : new FormArray([
        new FormGroup({
            school: new FormControl(''),
            degree: new FormControl(''),
            fieldOfStudy: new FormControl(''),
            startDate: new FormControl(''),
            endDate: new FormControl(''),
            location: new FormControl(''),
            description: new FormControl('')
        })
    ]),
    experienceDetails : new FormArray([
        new FormGroup({
            title: new FormControl(''),
            company: new FormControl(''),
            location: new FormControl(''),
            startDate: new FormControl(''),
            endDate: new FormControl(''),
            description: new FormControl('')
        })
    ]),
    languageDetails : new FormArray([
        new FormGroup({
            language: new FormControl(''),
            proficiency: new FormControl(0)
        })
    ])
} )as FormGroup

export const certificateSchema = new FormGroup({
    certificateName: new FormControl(''),
    issuingOrganization : new FormControl(''),
    issueDate: new FormControl( null , [Validators.required]),
    expirationDate : new FormControl(null, [Validators.required]),
    credentialUrl : new FormControl('', [Validators.required]),
    description : new FormControl('', [Validators.required]),
    type : new FormControl('', [Validators.required]),
    status : new FormControl('', [Validators.required]),
    skills : new FormControl([]),
    technologies : new FormControl([])
})

export const technologySchema = new FormGroup({
    techName : new FormControl('', [Validators.required]),
    projects : new FormControl([]),
    certificates : new FormControl([])
});

export const skillSchema = new FormGroup({
    title : new FormControl('', [Validators.required]),
    experience : new FormControl(''),
    proficiency : new FormControl(-1),
    certificates : new FormControl([])
});

export const skillDetailsControl = new FormGroup({
    skills: new FormArray([skillSchema])
})

export const projectSchema = new FormGroup({
    name : new FormControl('', [Validators.required]),
    description : new FormControl('', [Validators.required]),
    startDate : new FormControl('', [Validators.required]),
    endDate : new FormControl('', [Validators.required]),
    githubLink : new FormControl(''),
    liveLink : new FormControl(''),
    media : new FormControl([]),
    technologies : new FormArray([technologySchema]),
    skills : new FormArray([skillSchema])
})


export const projectDetailsControl = new FormGroup({
    projects : new FormArray([projectSchema])
})

export const languageDetailsSchema = new FormGroup({
    languages: new FormArray([languageSchema])
})

// Professional Summary Schema
export const professionalSummaryFormGroup = new FormGroup({
    professionalSummary: new FormControl('', [Validators.maxLength(500)]),
    careerObjective: new FormControl('', [Validators.maxLength(300)]),
    industry: new FormControl(''),
    specialization: new FormControl(''),
    totalExperienceYears: new FormControl(null),
    careerLevel: new FormControl(''),
    salaryExpectation: new FormControl(''),
    availabilityStatus: new FormControl('Open to opportunities'),
    preferredWorkLocations: new FormControl([]),
    workPreference: new FormControl(''),
    relocationOpen: new FormControl(false),
    timeZone: new FormControl('')
});

// Achievement Schema
export const achievementSchema = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    achievementDate: new FormControl('', [Validators.required]),
    category: new FormControl('Professional', [Validators.required]),
    organization: new FormControl(''),
    awardLevel: new FormControl(''),
    metrics: new FormControl([]),
    certificateUrl: new FormControl(''),
    isPublic: new FormControl(true)
});

// Reference Schema
export const referenceSchema = new FormGroup({
    referenceName: new FormControl('', [Validators.required]),
    referenceTitle: new FormControl('', [Validators.required]),
    referenceCompany: new FormControl('', [Validators.required]),
    referenceEmail: new FormControl('', [Validators.required, Validators.email]),
    referencePhone: new FormControl(''),
    relationship: new FormControl(''),
    recommendation: new FormControl(''),
    canContact: new FormControl(false),
    lastContactDate: new FormControl('')
});

// Soft Skill Schema
export const softSkillSchema = new FormGroup({
    skillName: new FormControl('', [Validators.required]),
    proficiencyLevel: new FormControl(1, [Validators.required]),
    description: new FormControl(''),
    examples: new FormControl([]),
    isCoreSkill: new FormControl(false)
});

// Publication Schema
export const publicationSchema = new FormGroup({
    title: new FormControl('', [Validators.required]),
    abstract: new FormControl('', [Validators.required]),
    publicationType: new FormControl('', [Validators.required]),
    journalName: new FormControl(''),
    publisher: new FormControl(''),
    publicationDate: new FormControl('', [Validators.required]),
    doi: new FormControl(''),
    url: new FormControl(''),
    coAuthors: new FormControl([]),
    keywords: new FormControl([]),
    citationCount: new FormControl(null),
    isPeerReviewed: new FormControl(false)
});

// Speaking Engagement Schema
export const speakingEngagementSchema = new FormGroup({
    eventName: new FormControl('', [Validators.required]),
    eventType: new FormControl('', [Validators.required]),
    topic: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    eventDate: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    organizer: new FormControl(''),
    audienceSize: new FormControl(null),
    duration: new FormControl(''),
    presentationUrl: new FormControl(''),
    videoUrl: new FormControl(''),
    tags: new FormControl([]),
    isKeynote: new FormControl(false)
});

// Professional Membership Schema
export const professionalMembershipSchema = new FormGroup({
    organizationName: new FormControl('', [Validators.required]),
    membershipType: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl(''),
    status: new FormControl('Active'),
    membershipNumber: new FormControl(''),
    website: new FormControl(''),
    description: new FormControl(''),
    benefits: new FormControl([]),
    isLeadershipRole: new FormControl(false),
    leadershipPosition: new FormControl('')
});

// Testimonial Schema
export const testimonialSchema = new FormGroup({
    clientName: new FormControl('', [Validators.required]),
    clientTitle: new FormControl('', [Validators.required]),
    clientCompany: new FormControl('', [Validators.required]),
    testimonialText: new FormControl('', [Validators.required]),
    rating: new FormControl(5),
    testimonialDate: new FormControl('', [Validators.required]),
    projectName: new FormControl(''),
    clientEmail: new FormControl(''),
    clientPhoto: new FormControl(''),
    isPublic: new FormControl(true),
    isFeatured: new FormControl(false),
    tags: new FormControl([])
});

// Business Venture Schema
export const businessVentureSchema = new FormGroup({
    ventureName: new FormControl('', [Validators.required]),
    ventureType: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl(''),
    status: new FormControl('Active'),
    website: new FormControl(''),
    industry: new FormControl(''),
    teamSize: new FormControl(null),
    fundingAmount: new FormControl(''),
    revenue: new FormControl(''),
    keyMetrics: new FormControl([]),
    technologies: new FormControl([]),
    lessonsLearned: new FormControl('')
});

// Board Position Schema
export const boardPositionSchema = new FormGroup({
    organizationName: new FormControl('', [Validators.required]),
    positionTitle: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl(''),
    status: new FormControl('Active'),
    organizationType: new FormControl('', [Validators.required]),
    organizationSize: new FormControl(''),
    responsibilities: new FormControl(''),
    keyAchievements: new FormControl([]),
    website: new FormControl(''),
    isCompensated: new FormControl(false),
    compensation: new FormControl('')
});

// Enhanced User Profile Schema with all professional data
export const enhancedUserProfileSchema = new FormGroup({
    basicDetails: basicDetailsFormGrourp,
    socialLinks: socialLinksFormGrourp,
    professionalSummary: professionalSummaryFormGroup,
    educationDetails: new FormArray([
        new FormGroup({
            school: new FormControl('', [Validators.required]),
            degree: new FormControl('', [Validators.required]),
            fieldOfStudy: new FormControl('', [Validators.required]),
            startDate: new FormControl('', [Validators.required]),
            endDate: new FormControl('', [Validators.required]),
            location: new FormControl(''),
            description: new FormControl('')
        })
    ]),
    experienceDetails: new FormArray([
        new FormGroup({
            title: new FormControl('', [Validators.required]),
            company: new FormControl('', [Validators.required]),
            location: new FormControl(''),
            startDate: new FormControl('', [Validators.required]),
            endDate: new FormControl(''),
            description: new FormControl('', [Validators.required]),
            teamSizeManaged: new FormControl(null),
            budgetResponsibility: new FormControl(''),
            reportingTo: new FormControl(''),
            keyMetrics: new FormControl([]),
            technologiesUsed: new FormControl([]),
            clientCompanySize: new FormControl(''),
            isCurrentRole: new FormControl(false),
            projectsLed: new FormControl([]),
            achievements: new FormControl([])
        })
    ]),
    languageDetails: new FormArray([
        new FormGroup({
            language: new FormControl('', [Validators.required]),
            proficiency: new FormControl(0, [Validators.required])
        })
    ]),
    achievements: new FormArray([achievementSchema]),
    references: new FormArray([referenceSchema]),
    softSkills: new FormArray([softSkillSchema]),
    publications: new FormArray([publicationSchema]),
    speakingEngagements: new FormArray([speakingEngagementSchema]),
    professionalMemberships: new FormArray([professionalMembershipSchema]),
    testimonials: new FormArray([testimonialSchema]),
    businessVentures: new FormArray([businessVentureSchema]),
    boardPositions: new FormArray([boardPositionSchema])
}) as FormGroup;