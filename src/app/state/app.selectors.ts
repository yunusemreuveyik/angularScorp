import { createFeatureSelector, createSelector } from "@ngrx/store";
import { appState } from "./app.state";


const getUserInfoState = createFeatureSelector<appState>("appStateOBJ");
const getLanguageState = createFeatureSelector<appState>("appStateOBJ");

export const getUserInfo = createSelector(getUserInfoState, state =>{
    return state.userinfo;
})
export const getLanguage = createSelector(getLanguageState, state =>{
    return state.language;
})