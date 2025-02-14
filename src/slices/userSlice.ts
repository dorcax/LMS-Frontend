import { api } from "./ApiSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  GenderEnum,
  RegisterData,
  RegisterResponse,
  LoginDetail,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  resetPasswordRequest,
  resetPasswordResponse
} from "./type";

export const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterResponse, RegisterData>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    loginUser: builder.mutation<LoginResponse, LoginDetail>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    //  forgotpassword
    forgotPassword: builder.mutation<ForgotPasswordResponse,ForgotPasswordRequest>({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
       
      }),
      invalidatesTags: ["user"],
    }),
    // reset password 
    resetPassword:builder.mutation<resetPasswordResponse,resetPasswordRequest>({
      query:(data)=>({
        url:"/auth/reset-password",
        method:"PATCH",
        body:data,
    
      
      })
    })
  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = userSlice;
