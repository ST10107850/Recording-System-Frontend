import { apiSlice } from "../auth/apiSlice";

const SUPPLIER_URL = "/api/vendor";

export const supplierSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSupplier: builder.mutation({
      query: (data) => ({
        url: `${SUPPLIER_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Suppliers"],
    }),

    getSuppliers: builder.query({
      query: () => `${SUPPLIER_URL}`,
      providesTags: ["Suppliers"],
    }),

    getSupplierById: builder.query({
      query: (id) => `${SUPPLIER_URL}/${id}`,
      providesTags: (result, error, id) => [{ type: "Suppliers", id }],
    }),

    updateSupplier: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${SUPPLIER_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Suppliers", id },
        "Suppliers",
      ],
    }),

    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `${SUPPLIER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Suppliers", id },
        "Suppliers",
      ],
    }),
  }),
});

export const {
  useCreateSupplierMutation,
  useGetSuppliersQuery,
  useGetSupplierByIdQuery,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = supplierSlice;
