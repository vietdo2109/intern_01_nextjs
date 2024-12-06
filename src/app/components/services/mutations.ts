import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Schema } from "@/schemas/zodSchema";
import axios from "axios";
import { mapData } from "../../utils/mapData";
import { omit } from "lodash";
import { Author, AuthorFromDB } from "@/lib/models/author";
import { AnswerFromDB } from "@/lib/models/quiz/answer";
import { QuestionFromDB } from "@/lib/models/quiz/quesion";
import { QuizFromDB } from "@/lib/models/quiz/quiz";

export interface Todo {
  id: number;
  text: string;
  date: string;
  type: "Planned" | "Upcoming" | "Completed";
  tags: number[];
}

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
      await axios.post("http://localhost:3000/api/todos", data);
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
      await axios.put(`http://localhost:3000/api/todos/${data.id}`, data);
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
      await axios.delete(`http://localhost:3000/api/todos/${id}`);
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
      await axios.post("http://localhost:3000/api/authors", data);
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
      await axios.put(`http://localhost:3000/api/authors/${data.id}`, data);
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
      await axios.delete(`http://localhost:3000/api/authors/${id}`);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
  });
}

export function useCreateAnswer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<AnswerFromDB, "id">) => {
      const response = await axios.post(
        "http://localhost:3000/api/answers",
        data
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["answers"] });
    },
  });
}

export function useEditAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AnswerFromDB) => {
      await axios.put(`http://localhost:3000/api/answers/${data.id}`, data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["answers"] });
    },
  });
}

export function useDeleteAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/api/answers/${id}`);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["answers"] });
    },
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<QuestionFromDB, "id">) => {
      const response = await axios.post(
        "http://localhost:3000/api/questions",
        data
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}

export function useEditQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: QuestionFromDB) => {
      const response = await axios.put(
        `http://localhost:3000/api/questions/${data.id}`,
        data
      );
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/api/questions/${id}`);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}

export function useCreateQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<QuizFromDB, "id" | "userid">) => {
      const response = await axios.post(
        "http://localhost:3000/api/quizzes",
        data
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
}

export function useEditQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: QuizFromDB) => {
      const response = await axios.put(
        `http://localhost:3000/api/quizzes/${data.id}`,
        data
      );
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/api/quizzes/${id}`);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
}
