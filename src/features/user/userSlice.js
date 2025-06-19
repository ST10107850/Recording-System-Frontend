import { apiSlice } from "../auth/apiSlice";

const USER_URL = "/api/user";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    getUser: builder.query({
      query: () => `${USER_URL}`,
      providesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }, "User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation
} = userSlice;
