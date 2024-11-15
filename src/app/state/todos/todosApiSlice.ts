import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../todo/todoSlice";

export const todosApiSlice = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://intern-01-fake-backend.onrender.com",
  }),
  tagTypes: ["Todos"], // Define the tag type for the query

  endpoints: (builder) => {
    return {
      getTodos: builder.query<Todo[], object>({
        query: () => "/todos",
        providesTags: ["Todos"],
      }),
      getTodo: builder.query<Todo, number>({
        query: (id) => `/todos/${id}`,
        providesTags: ["Todos"],
      }),
      createTodos: builder.mutation<Todo, Omit<Todo, "id">>({
        query: (todo) => ({
          url: "/todos",
          method: "POST",
          body: todo,
        }),
        invalidatesTags: ["Todos"],
      }),
      deleteTodo: builder.mutation<Todo, number>({
        query: (id) => ({
          url: `/todos/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Todos"],
      }),
      updateTodo: builder.mutation<Todo, Partial<Todo> & Pick<Todo, "id">>({
        query: ({ id, ...patch }) => ({
          url: `/todos/${id}`,
          method: "PATCH",
          body: patch,
        }),
        invalidatesTags: ["Todos"],
      }),
    };
  },
});

export const {
  useGetTodosQuery,
  useCreateTodosMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  useGetTodoQuery,
} = todosApiSlice;
