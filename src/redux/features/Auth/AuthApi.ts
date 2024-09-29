import { baseApi } from "../../api/baseApi";



const AuthApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query:(userInfo)=>({
                url:'/auth/login',
                method:"POST",
                body:userInfo,
            }),
            
        }),
        signUp: builder.mutation({
            query:(data)=>({
                url:'/auth/register',
                method:"POST",
                body:data
            }),
        
        })
    })
})


export const {useLoginMutation,useSignUpMutation} =AuthApi