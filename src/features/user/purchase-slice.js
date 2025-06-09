import { apiSlice } from "../auth/apiSlice";

const PURCHASE_uRL = "/api/purchase";

export const purchaseSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPurchase: builder.mutation({
      query: (data) => ({
        url: `${PURCHASE_uRL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Purchases"],
    }),

    getPurchases: builder.query({
      query: () => `${PURCHASE_uRL}`,
      providesTags: ["Purchases"],
    }),

    getPurchaseById: builder.query({
      query: (id) => `${PURCHASE_uRL}/${id}`,
      providesTags: (result, error, id) => [{ type: "Purchases", id }],
    }),

    updatePurchase: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${PURCHASE_uRL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Purchases", id },
        "Purchases",
      ],
    }),

    deletePurchase: builder.mutation({
      query: (id) => ({
        url: `${PURCHASE_uRL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Purchases", id },
        "Purchases",
      ],
    }),
  }),
});

export const {
  useCreatePurchaseMutation,
  useGetPurchasesQuery,
  useGetPurchaseByIdQuery,
  useUpdatePurchaseMutation,
  useDeletePurchaseMutation,
} = purchaseSlice;
