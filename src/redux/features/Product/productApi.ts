

import { Product, ProductQueryParams, UpdateProduct } from "../../../types/types";
import { baseApi } from "../../api/baseApi";



interface ProductResponse {
    data: Product[];
}

interface SingleProductResponse {
    data: Product;
}

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        
        getProducts: builder.query<ProductResponse, ProductQueryParams>({
            query: ({ search = '', category = '', minPrice = 0, maxPrice = 1000, sort = '' } = {}) => {
                const params = new URLSearchParams();

                if (search) params.append('search', search);
                if (category) params.append('category', category);
                if (minPrice) params.append('minPrice', String(minPrice));
                if (maxPrice) params.append('maxPrice', String(maxPrice));
                if (sort) params.append('sort', sort);

                return {
                    url: `/products?${params.toString()}`,
                };
            },
            keepUnusedDataFor: 300,
            refetchOnMountOrArgChange: true, 
            providesTags: ["Product"],
        }),

      
        getProductById: builder.query<SingleProductResponse, string>({
            query: (id) => ({
                url: `/products/${id}`,
            }),
            providesTags: ["Product"],
        }),

        
        updateProduct: builder.mutation<void, UpdateProduct>({
            query: ({ id, data }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),

      
        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),

       
        createProduct: builder.mutation<void, Product>({
            query: (data) => ({
                url: "/products/create-product",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});


export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCreateProductMutation,
} = productApi;
