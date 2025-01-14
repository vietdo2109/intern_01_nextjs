import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Schema } from "@/schemas/zodSchema";
import axios from "axios";
import { mapData } from "../utils/mapData";
import { omit } from "lodash";
import { Author, AuthorFromDB } from "@/lib/models/author";
import { AnswerFromDB } from "@/lib/models/quiz/answer";
import { QuestionFromDB } from "@/lib/models/quiz/quesion";
import { QuizFromDB } from "@/lib/models/quiz/quiz";
import { Settings } from "@/(pages)/pomodoro/page";
import { ChatslotFromDB } from "@/lib/models/chat/chatslot";

const BASE_URL = "http://localhost:3000/";
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
      await axios.post(`${BASE_URL}api/todos`, data);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
      await queryClient.invalidateQueries({ queryKey: ["todoIds"] });
    },
  });
}

export function useEditPomodoroSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Settings) => {
      await axios.put(`${BASE_URL}api/user`, data);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
}

export function useEditTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Todo) => {
      await axios.put(`${BASE_URL}api/todos/${data.id}`, data);
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
      await axios.delete(`${BASE_URL}api/todos/${id}`);
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
      await axios.post(`${BASE_URL}api/authors`, data);
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
      await axios.put(`${BASE_URL}api/authors/${data.id}`, data);
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
      await axios.delete(`${BASE_URL}api/authors/${id}`);
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
      const response = await axios.post(`${BASE_URL}api/answers`, data);
      return response.data;
    },

    onSuccess: async (data) => {
      const { id } = data;

      await queryClient.invalidateQueries({ queryKey: ["answers", id] });
    },
  });
}

export function useEditAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AnswerFromDB) => {
      const response = await axios.put(
        `${BASE_URL}api/answers/${data.id}`,
        data
      );
      return response.data;
    },

    onSuccess: async (data) => {
      const { id } = data;
      await queryClient.invalidateQueries({
        queryKey: ["answers", Number(id)],
      });
    },
  });
}

export function useDeleteAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(`${BASE_URL}api/answers/${id}`);
      return response.data;
    },

    onSuccess: async (data) => {
      const { answerId } = data;
      queryClient.removeQueries({ queryKey: ["answers", answerId] });
    },
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<QuestionFromDB, "id">) => {
      const response = await axios.post(`${BASE_URL}api/questions`, data);
      return response.data;
    },

    onSuccess: async (newData) => {
      await queryClient.invalidateQueries({
        queryKey: ["questions", newData.id],
      });
    },
  });
}

export function useEditQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: QuestionFromDB) => {
      const response = await axios.put(
        `${BASE_URL}api/questions/${data.id}`,
        data
      );
      return response.data;
    },
    onSuccess: async (data) => {
      const { id } = data;
      await queryClient.invalidateQueries({
        queryKey: ["questions", Number(id)],
      });
    },
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(`${BASE_URL}api/questions/${id}`);
      return response.data; // Assuming the response contains {message, questionId, quizId}
    },
    onSuccess: async (data) => {
      const { questionId } = data;

      // Invalidate the quiz to update its questionIds
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });

      // Remove the specific question from the React Query cache
      queryClient.removeQueries({ queryKey: ["questions", questionId] });
    },
  });
}

export function useCreateQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<QuizFromDB, "id" | "userid">) => {
      const response = await axios.post(`${BASE_URL}api/quizzes`, data);
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
        `${BASE_URL}api/quizzes/${data.id}`,
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
      await axios.delete(`${BASE_URL}api/quizzes/${id}`);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
}

export function useCreateChatslot() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<ChatslotFromDB, "id" | "userid">) => {
      const response = await axios.post(`${BASE_URL}api/chatslots`, data);
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["chatslots"] });
    },
  });
}

export function useEditChatslot() {
  return useMutation({
    mutationFn: async (data: Omit<ChatslotFromDB, "userid">) => {
      const response = await axios.put(
        `${BASE_URL}api/chatslots/${data.id}`,
        data
      );
      console.log(response.data);
      return response.data;
    },
    // onSuccess: async (data) => {
    //   const { id } = data;
    //   await queryClient.invalidateQueries({ queryKey: ["chatslots", id] });
    // },
  });
}
