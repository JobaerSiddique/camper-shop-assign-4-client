
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createOrder:builder.mutation({
            query:(data)=>({
                url:"/order/createOrder",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Order"]
        })
    })
})


export const {useCreateOrderMutation} = orderApi