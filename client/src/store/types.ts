
import { ICertificate, IProject, ISkill, IUserData } from "src/modules/dashboard/types";

export interface IPortfolioState {
    user : IUserData | null,
    projects : IProject[],
    skills : ISkill[],
    certificates : ICertificate[]
}

export interface IAppState {
    portfolio : IPortfolioState
}