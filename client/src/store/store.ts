import { createReducer, INITIAL_STATE, on } from "@ngrx/store";
import { IAppState, IPortfolioState } from "./types";
import { setUserData } from "./actions";

export const appInitialState: IPortfolioState = {
  user: null,
  projects: [],
  skills: [],
  certificates: []
}

export const portfolioReducer = createReducer(
  appInitialState,
  on(setUserData, (state, { user }) => ({
    ...state,
    user
  }))
);