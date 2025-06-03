import { apiSlice } from "../auth/apiSlice";

const VENDOR_URL = "/api/vendor";

export const vendorSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createVendor: builder.mutation({
      query: (data) => ({
        url: `${VENDOR_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vendors"],
    }),

    getVendors: builder.query({
      query: () => `${VENDOR_URL}`,
      providesTags: ["Vendors"],
    }),

    getVendorById: builder.query({
      query: (id) => `${VENDOR_URL}/${id}`,
      providesTags: (result, error, id) => [{ type: "Vendors", id }],
    }),

    updateVendor: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${VENDOR_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Vendors", id },
        "Vendors",
      ],
    }),

    deleteVendor: builder.mutation({
      query: (id) => ({
        url: `${VENDOR_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Vendors", id },
        "Vendors",
      ],
    }),
  }),
});

export const {
  useCreateVendorMutation,
  useGetVendorsQuery,
  useGetVendorByIdQuery,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
} = vendorSlice;
