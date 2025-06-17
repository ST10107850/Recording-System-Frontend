import { apiSlice } from "../auth/apiSlice";

const TASK_URL = "/api/task";

export const taskSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),

    getTasks: builder.query({
      query: () => `${TASK_URL}`,
      providesTags: ["Task"],
    }),

    getTaskById: builder.query({
      query: (id) => `${TASK_URL}/${id}`,
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),

    updateTask: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${TASK_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Task", id },
        "Task",
      ],
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `${TASK_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Task", id }, "Task"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskSlice;
