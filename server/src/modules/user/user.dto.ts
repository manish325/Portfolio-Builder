import { IsString, IsEmail, IsNotEmpty, IsNumber, IsDateString } from "class-validator";

export class UserProfileDataDto {
    basicDetails: BasicDetailsDto;
    socialDetails : SocialDetailsDto;
    educationDetails : EducationDetailsDto;
    experienceDetails : ExperienceDetailsDto;
    languageDetails : LanguageDetailsDto;
}

export class BasicDetailsDto {
    @IsString()
    @IsNotEmpty()
    name : string;

    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsString()
    @IsNotEmpty()
    phoneNumber : string;

    @IsString()
    address : string;

    @IsString()
    country : string;

    @IsString()
    profileSummary : string;

    @IsString()
    profilePicture : string;
}

export class SocialDetailsDto {
    @IsString()
    github: string;

    @IsString()
    linkedIn : string;
}

export class EducationDetailsDto {
    @IsString()
    @IsNotEmpty()
    institutionName : string;

    @IsString()
    @IsNotEmpty()
    qualification : string;

    @IsString()
    @IsNotEmpty()
    fieldOfStudy : string;

    @IsString()
    @IsNotEmpty()
    grade : string;

    @IsDateString()
    @IsNotEmpty()
    startDate : string;

    @IsDateString()
    @IsNotEmpty()
    endDate : string;

    @IsString()
    description : string;

    @IsNotEmpty()
    certificates : CertificateDto[] | [];

}

export class ExperienceDetailsDto {
    @IsString()
    experienceId : string;

    @IsString()
    @IsNotEmpty()
    companyName : string;

    @IsString()
    @IsNotEmpty()
    jobTitle : string;

    @IsDateString()
    @IsNotEmpty()
    startDate : string;

    @IsDateString()
    @IsNotEmpty()
    endDate : string;

    @IsDateString()
    @IsNotEmpty()
    jobDescription : string;

    @IsString()
    @IsNotEmpty()
    keyAchievements : string;

    @IsString()
    @IsNotEmpty()
    companyIndustry : string;

    @IsString()
    @IsNotEmpty()
    location : string;

    @IsString()
    @IsNotEmpty()
    employmentType : string;

}

export class CertificateDto {
    @IsString()
    certificateId : string;

    @IsString()
    @IsNotEmpty()
    certificateName : string;

    @IsString()
    @IsNotEmpty()
    issuingOrganization : string;

    @IsDateString()
    @IsNotEmpty()
    issueDate : string;

    @IsDateString()
    @IsNotEmpty()
    expirationDate : string;

    @IsDateString()
    @IsNotEmpty()
    credentialUrl : string;

    @IsString()
    @IsNotEmpty()
    description : string;

}

export class SkillsDetailsDto {
    @IsString()
    skillId : string;

    @IsString()
    @IsNotEmpty()
    title : string;    
}

export class LanguageDetailsDto {
    @IsString()
    @IsNotEmpty()
    languageId : string;

    @IsString()
    @IsNotEmpty()
    languageProficiency : string;
}