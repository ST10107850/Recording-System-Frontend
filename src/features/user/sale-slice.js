import { apiSlice } from "../auth/apiSlice";

const SALE_URL = "/api/sale";

export const saleSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSale: builder.mutation({
      query: (data) => ({
        url: `${SALE_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sale"],
    }),

    getSales: builder.query({
      query: () => `${SALE_URL}`,
      providesTags: ["Sale"],
    }),

    getCustomerCountSales: builder.query({
      query: () => `${SALE_URL}/customer-count`,
      providesTags: ["Sale"],
    }),

    getSaleById: builder.query({
      query: (id) => `${SALE_URL}/${id}`,
      providesTags: (result, error, id) => [{ type: "Sale", id }],
    }),

    updateSale: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${SALE_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Sale", id },
        "Sale",
      ],
    }),

    deleteSale: builder.mutation({
      query: (id) => ({
        url: `${SALE_URL}/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Sale", id }, "Sale"],
    }),
  }),
});

export const {
  useCreateSaleMutation,
  useGetSalesQuery,
  useGetSaleByIdQuery,
  useUpdateSaleMutation,
  useDeleteSaleMutation,
  useGetCustomerCountSalesQuery,
} = saleSlice;
