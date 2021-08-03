import { createReducer, on } from "@ngrx/store";
import { TranslatingService } from "../services/translatingService.service";
import { changeLanguage } from "./app.actions";
import { appState, initialState } from "./app.state";



const _appReducer = createReducer(
    initialState,
    on(changeLanguage, (state, action)=>{
        return {
            ...state,
            language: action.lang
        }
    })
)


export function appReducer(state: any, action:any){
    return _appReducer(state, action);
}
