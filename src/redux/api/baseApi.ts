import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl:'https://camper-shop-4-server.vercel.app/api/v1/',
    credentials:'include',
    prepareHeaders:(headers,{getState})=>{
        const token = (getState() as RootState).auth.token;
        
        if(token){
            headers.set('authorization',` ${token}`)
        }
        return headers;
    }
})

export const baseApi = createApi({
    reducerPath:'baseApi',
    baseQuery:baseQuery,
    tagTypes: ['Product', 'Cart','User','Order'],
    endpoints: ()=>({})
    
})