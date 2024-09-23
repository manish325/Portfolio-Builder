import { createSelector } from "@ngrx/store";
import { IAppState } from "./types";

export const selectUser = ((state: IAppState) =>{
    console.log('Logging the state in the selectUser selector', state);
    return state.portfolio.user;
});
export const userSelector = createSelector(selectUser, state => {
    console.log('Logging the state in the user selector', state);
    return state
});