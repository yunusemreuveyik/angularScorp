import { createAction, props } from "@ngrx/store";
import { appState } from "./app.state";

export const changeLanguage = createAction('Change Language',
props<{lang: string}>())