import { baseApi } from "../../api/baseApi";



export const productApi = baseApi.injectEndpoints({
  
    endpoints: (builder) => ({
        
        getProducts: builder.query({

            query: (query = {}) => {
                const { search = '', category = '', minPrice = 0, maxPrice = 1000, sort = '' } = query;
                let queryString = `/products?`;
                if (search) queryString += `search=${search}&`;
                if (category) queryString += `category=${category}&`;
                if (minPrice) queryString += `minPrice=${Number(minPrice)}&`;
        if (maxPrice) queryString += `maxPrice=${Number(maxPrice)}&`;
        if (sort) queryString += `sort=${encodeURIComponent(sort)}&`;
                // if (sort) queryString += `sort=${sort}&`;
        
                return {
                  url: queryString,
                };
              },
              keepUnusedDataFor: 300, 
              refetchOnMountOrArgChange: true,
              providesTags:["Product"]
        },
        
    ),
        
        getProductById : builder.query({
            query: (id)=>({
                url:`/products/${id}`,
                method:"GET"
            }),
            providesTags:["Product"]
        }),
        updateProduct: builder.mutation({
            query:({id,data})=>({
                url:`/products/${id}`,
                method:"PUT",
                body:data
            }),
            invalidatesTags:["Product"]
        }),
        deleteProduct: builder.mutation({
            query: (id)=>({
                url:`/products/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Product"]
        }),
        createProduct : builder.mutation({
            query:(data)=>({
                url:"/products/create-product",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Product"]
        })
      }),
      
})
    


      
export const {useGetProductsQuery,useGetProductByIdQuery,useUpdateProductMutation,useDeleteProductMutation,useCreateProductMutation} = productApi;