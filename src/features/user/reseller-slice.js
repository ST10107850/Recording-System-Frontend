import { apiSlice } from "../auth/apiSlice";

const RESELLER_URL = "/api/customer";

export const resellerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReseller: builder.mutation({
      query: (data) => ({
        url: `${RESELLER_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reseller"],
    }),

    getResellers: builder.query({
      query: () => `${RESELLER_URL}`,
      providesTags: ["Reseller"],
    }),

    getResellerById: builder.query({
      query: (id) => `${RESELLER_URL}/${id}`,
      providesTags: (result, error, id) => [{ type: "Reseller", id }],
    }),

    updateReseller: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${RESELLER_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Reseller", id },
        "Reseller",
      ],
    }),

    deleteReseller: builder.mutation({
      query: (id) => ({
        url: `${RESELLER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Reseller", id },
        "Reseller",
      ],
    }),
  }),
});

export const {
  useCreateResellerMutation,
  useGetResellersQuery,
  useGetResellerByIdQuery,
  useUpdateResellerMutation,
  useDeleteResellerMutation,
} = resellerSlice;
