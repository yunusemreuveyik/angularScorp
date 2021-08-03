import { userinfo } from "../models/userinfo";

export interface appState {
    language: string,
    userinfo: userinfo
}

export const initialState: appState = {
    language: "tr",
    userinfo: {
        email:"",
        name:"",
        password:"",
        title:""
    }
}