
import { baseApi } from "../../api/baseApi";



export const CartApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        addToCart: builder.mutation({
            query:(product)=>({
                url:'/carts',
                method:"POST",
                body:product
            }),
            invalidatesTags:["Cart"]
        }),
        getUserCart: builder.query({
            query: ()=>({
                url:'/carts',
                method:"GET"
            }),
            transformResponse: (response: any) => response.data,
            providesTags:["Cart"]
        }),
        getUserUpdateCart: builder.mutation({
            query:(data)=>({
                url:"/carts/updateCart",
                method:"PUT",
                body:data
            }),
            invalidatesTags:["Cart"]
        }),
        getTotalPrice: builder.query({
            query:()=>({
                url:"/carts/totalcost",
                method:"GET"
            }),
            transformResponse: (response: any) => response.data,
            providesTags:["Cart"]
        }),
        deleteCart: builder.mutation({
            query:(id)=>({
                url:`/carts/delete/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Cart"]
        }),
        updateCart: builder.mutation({
            query:(data)=>({
                url:"/carts/updateCart",
                method:"PUT",
                body:data
            }),
            invalidatesTags:["Cart"]
        })
    })
   
})


export const {useAddToCartMutation,useGetUserCartQuery,useGetUserUpdateCartMutation,useGetTotalPriceQuery,useDeleteCartMutation, useUpdateCartMutation} = CartApi;