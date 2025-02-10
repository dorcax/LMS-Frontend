

import{createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


const token =""
const baseQuery =fetchBaseQuery({
baseUrl:"http://localhost:3000",
prepareHeaders:(headers)=>{
    headers.set("Authorization",`Bearer ${token}`)
    return headers
}
})
const tagTypes=["user","course","department","faculty","student","courseEnrollment","lecturer"]
export const api =createApi({
    baseQuery,
    endpoints:(builder)=>({}),
    tagTypes
})