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
      invalidatesTags: ["auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    getUser: builder.query({
      query: () => `${USER_URL}`,
      providesTags: ["auth"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetUserQuery} = userSlice;
