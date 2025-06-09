import { apiSlice } from "../auth/apiSlice";

const INVENTORY_URL = "/api/inventory";

export const inventorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInventory: builder.mutation({
      query: (data) => ({
        url: `${INVENTORY_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Inventory"],
    }),

    getInventory: builder.query({
      query: () => `${INVENTORY_URL}`,
      providesTags: ["Inventory"],
    }),

    getInventoryById: builder.query({
      query: (id) => `${INVENTORY_URL}/${id}`,
      providesTags: (result, error, id) => [{ type: "Inventory", id }],
    }),

    updateInventory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${INVENTORY_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Inventory", id },
        "Inventory",
      ],
    }),

    deleteInventory: builder.mutation({
      query: (id) => ({
        url: `${INVENTORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Inventory", id },
        "Inventory",
      ],
    }),
  }),
});

export const {
  useCreateInventoryMutation,
  useGetInventoryQuery,
  useGetInventoryByIdQuery,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
} = inventorySlice;
