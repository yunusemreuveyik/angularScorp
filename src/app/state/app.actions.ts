import { createAction, props } from "@ngrx/store";
import { userinfo } from "../models/userinfo";
import { appState } from "./app.state";

export const changeLanguage = createAction('Change Language', props<{lang: string}>())
export const updateUser = createAction('[LOGIN MODAL] Update User', props<{user: userinfo}>())