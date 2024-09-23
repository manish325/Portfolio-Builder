import { createAction, props } from "@ngrx/store";
import { IAppState } from "./types";
import { IUserData } from "src/modules/dashboard/types";

export const setUserData = createAction('Set User Data', props<{ user : IUserData | null }>());