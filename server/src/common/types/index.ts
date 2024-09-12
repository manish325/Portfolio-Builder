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