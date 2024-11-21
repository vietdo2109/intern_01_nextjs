import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Schema } from "@/schemas/zodSchema";
import axios from "axios";
import { mapData } from "../../utils/mapData";
import { omit } from "lodash";
import { Todo } from "@/state/todo/todoSlice";
import { Author, AuthorFromDB } from "@/lib/models/author";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Schema) => {
      await axios.post(
        `https://intern-01-fake-backend.onrender.com/users`,
        omit(mapData(data), "variant")
      );
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      alert("created new user");
    },
  });
}

export function useEditUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Schema) => {
      if (data.variant === "edit") {
        await axios.put(
          `https://intern-01-fake-backend.onrender.com/users/${data.id}`,
          omit(mapData(data), "variant")
        );
      }
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });

      if (variables.variant === "edit") {
        await queryClient.invalidateQueries({
          queryKey: ["user", { id: variables.id }],
        });
      }
    },
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Todo) => {
      await axios.post(
        "https://intern-01-nextjs-ivh7s0ild-viet21s-projects.vercel.app/api/todos",
        data
      );
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
      await queryClient.invalidateQueries({ queryKey: ["todoIds"] });
    },
  });
}

export function useEditTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Todo) => {
      await axios.put(
        `https://intern-01-nextjs-ivh7s0ild-viet21s-projects.vercel.app/api/todos/${data.id}`,
        data
      );
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
      await queryClient.invalidateQueries({
        queryKey: ["todos", { id: variables.id }],
      });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(
        `https://intern-01-nextjs-ivh7s0ild-viet21s-projects.vercel.app/api/todos/${id}`
      );
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
      await queryClient.invalidateQueries({ queryKey: ["todoIds"] });
    },
  });
}

export function useCreateAuthor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Author) => {
      await axios.post(
        "https://intern-01-nextjs-ivh7s0ild-viet21s-projects.vercel.app/api/authors",
        data
      );
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
  });
}

export function useEditAuthor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AuthorFromDB) => {
      await axios.put(
        `https://intern-01-nextjs-ivh7s0ild-viet21s-projects.vercel.app/api/authors/${data.id}`,
        data
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
  });
}

export function useDeleteAuthor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(
        `https://intern-01-nextjs-ivh7s0ild-viet21s-projects.vercel.app/api/authors/${id}`
      );
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
  });
}
