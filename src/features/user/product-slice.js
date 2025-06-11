import { apiSlice } from "../auth/apiSlice";

const PRODUCT_URL = "/api/product";

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    getProducts: builder.query({
      query: () => `${PRODUCT_URL}`,
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (id) => `${PRODUCT_URL}/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        "Product",
      ],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Product", id },
        "Product",
      ],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productSlice;
