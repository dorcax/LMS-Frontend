
import { createSlice } from "@reduxjs/toolkit"
import { api } from "./ApiSlice"


const initialState={
    
    userInfo:JSON.parse(localStorage?.getItem("userInfo")||"{}")??null,
    token:localStorage.getItem("token"),
    isAuthenticated:false
}


  const AuthSlice =createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo =action.payload.user
            state.token=action.payload.token
            state.isAuthenticated =true
            // localStorage.setItem("token",action.payload.token)
             localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        LogOut:(state)=>{{
         state.userInfo=null
         state.isAuthenticated=false
         localStorage.removeItem("token")
        }}
    }
 }) 

export const {setCredentials,LogOut} =AuthSlice.actions
export default AuthSlice.reducer