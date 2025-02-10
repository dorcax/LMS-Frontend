import { api } from "./ApiSlice";
import{createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
type RegisterData={
   firstName: string;
  surName: string;
  email: string;
  matricNo: string;
  password: string;
  dob: Date |string;
  address: string;
  phoneNumber: string;
  sex: GenderEnum;
}
type RegisterResponse = {
  firstName: string;
  surName: string;
  email: string;
  matricNo: string;
  password: string;
  dob: string;
  address: string;
  phoneNumber: string;
  sex: string;
};

 export const userSlice = api.injectEndpoints({
   endpoints: (builder)=>({
     registerUser: builder.mutation<RegisterResponse,RegisterData>({
      query:(data)=>({
         url:"/auth/register",
         method:"POST",
         body:data
      }),
      invalidatesTags:["user"]
     })
  
   }),
 });  
 export const{useRegisterUserMutation} =userSlice