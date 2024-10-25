import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Schema } from "@/schemas/zodSchema";
import axios from "axios";
import { mapData } from "../../utils/mapData";
import { omit } from "lodash";
import { Todo } from "@/state/todo/todoSlice";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Schema) => {
      await axios.post(
        "http://localhost:8080/users",
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
          `http://localhost:8080/users/${data.id}`,
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
      await axios.post("http://localhost:8080/todos", data);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useEditTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Todo) => {
      await axios.put(`http://localhost:8080/todos/${data.id}`, data);
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
      await axios.delete(`http://localhost:8080/todos/${id}`);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
