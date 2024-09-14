import { SafeResourceUrl } from "@angular/platform-browser";

export interface IUserData {
  id: string;
  name: string;
  email: string;
  profilePicture : string | SafeResourceUrl,
  phone : string,
  profileSummary : string

  github : string,
  linkedin : string,
  contactEmail : string,
  location : string,


  education : IEducation[],
  experience: IExperience[],
  certifications: ICertification[],
  languages : ILanguage[],


  skills : ISkill[],
  projects : IProject[],
  // Add other fields as needed
}

export interface ISkill {
  id : string,
  title: string,
  experience : number,
  proficiency : number,
  certificates : ICertificate[]

}

export interface IProject {
  id : string,
  name : string,
  description : string,
  startDate : string,
  endDate : string,
  media : string[]
  technologies : ITechnology[],
  skills : ISkill[]
}

export interface ITechnology {
  id : string,
  name : string
  certificates : ICertificate[],
}

export interface ICertificate {
  id : string,
  name : string,
  issuingOrganization : string,
  issueDate : Date,
  expirationDate : Date,
  url : string[],
}

export interface IEducation {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export interface IExperience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ICertification {
  title: string;
  issuer: string;
  date: string;
  url: string;
  description: string;
}

export interface ILanguage {
    language : string,
    proficiency : number
}

export interface ILayout {
  path : string,
  image : string,
  title : string
}