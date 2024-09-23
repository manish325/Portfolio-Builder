import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

export const basicDetailsFormGrourp = new FormGroup({
    name : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required]),
    phone : new FormControl('', [Validators.required]),
    profilePicture : new FormControl(),
    address : new FormControl(''),
    country : new FormControl(''),
    profileSummary : new FormControl(''),
});

export const languageSchema = new FormGroup({
    language : new FormControl('', [Validators.required]),
    proficiency : new FormControl('', [Validators.required])
})

export const socialLinksFormGrourp = new FormGroup({
    github : new FormControl(''),
    linkedin : new FormControl('')
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

export const userProfileSchema = {
    basicDetails : basicDetailsFormGrourp,
    socialLinks : socialLinksFormGrourp,
    educationDetails : new FormArray(
        [
           educationDetailsFormGrourp
        ]
    ),
    experienceDetails : new FormArray([experienceDetailsFormGrourp]),
    languageDetails : new FormArray([languageSchema])
}

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
})

export const projectSchema = {
    name : new FormControl('', [Validators.required]),
    description : new FormControl('', [Validators.required]),
    startDate : new FormControl('', [Validators.required]),
    endDate : new FormControl('', [Validators.required]),
    githubLink : new FormControl(''),
    liveLink : new FormControl(''),
    media : new FormControl([]),
    technologies : new FormArray([technologySchema]),
    skills : new FormArray([skillSchema])
}