import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Option } from "../types/mediumForm/option";
import { ApiGet } from "../types/mediumForm/apiTypes";
import { Schema } from "@/schemas/zodSchema";
import { Todo } from "./mutations";
import { AuthorFromDB } from "@/lib/models/author";
import { QuizFromDB } from "@/lib/models/quiz/quiz";
import { QuestionFromDB } from "@/lib/models/quiz/quesion";
import { AnswerFromDB } from "@/lib/models/quiz/answer";
import { SettingsFromDB } from "@/lib/models/pomodoro/settings";
import { ChatslotFromDB } from "@/lib/models/chat/chatslot";
const BASE_URL = "http://localhost:3000/";

export function useStates() {
  return useQuery({
    queryKey: ["states"],
    queryFn: () =>
      axios
        .get<Option[]>("https://intern-01-fake-backend.onrender.com/states")
        .then((res) => res.data),
  });
}

export function useLanguages() {
  return useQuery({
    queryKey: ["languages"],
    queryFn: () =>
      axios
        .get<Option[]>("https://intern-01-fake-backend.onrender.com/languages")
        .then((res) => res.data),
  });
}

export function useGenders() {
  return useQuery({
    queryKey: ["genders"],
    queryFn: () =>
      axios
        .get<Option[]>("https://intern-01-fake-backend.onrender.com/genders")
        .then((res) => res.data),
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () =>
      axios
        .get<Option[]>("https://intern-01-fake-backend.onrender.com/skills")
        .then((res) => res.data),
  });
}
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axios
        .get<ApiGet[]>("https://intern-01-fake-backend.onrender.com/users")
        .then((res) =>
          res.data.map(
            (user) =>
              ({
                id: user.id,
                label: user.name,
              } satisfies Option)
          )
        ),
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ["user", { id }],
    queryFn: async (): Promise<Schema> => {
      const { data } = await axios.get<ApiGet>(
        `https://intern-01-fake-backend.onrender.com/users/${id}`
      );

      return {
        variant: "edit",
        id: data.id,
        name: data.name,
        email: data.email,
        FEPeriod: [
          formatDate(new Date(data.FEPeriod[0])),
          formatDate(new Date(data.FEPeriod[1])),
        ],
        gender: data.gender,
        languages: data.languages,
        salaryRange: [data.salaryRange[0], data.salaryRange[1]],
        skills: data.skills,
        states: data.states,
        isTeacher: data.isTeacher,
        students: data.students,
        dob: formatDate(new Date(data.dob)),
      };
    },
    enabled: !!id,
  });
}

function formatDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, "0");

  // Format the date as 'YYYY-MM-DD'
  return `${year}-${month}-${day}`;
}

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: (): Promise<Todo[]> =>
      axios.get<Todo[]>(`${BASE_URL}api/todos`).then((res) => res.data),
  });
}

export function useTodo(id: number) {
  return useQuery({
    queryKey: ["todos", id],
    queryFn: (): Promise<Todo> =>
      axios.get<Todo>(`${BASE_URL}api/todos/` + id).then((res) => res.data),
  });
}

export function useAuthors() {
  return useQuery({
    queryKey: ["authors"],
    queryFn: (): Promise<AuthorFromDB[]> =>
      axios
        .get<AuthorFromDB[]>(`${BASE_URL}api/authors`)
        .then((res) => res.data),
  });
}

export function useAuthor(id: number) {
  return useQuery({
    queryKey: ["authors", id],
    queryFn: (): Promise<AuthorFromDB> =>
      axios
        .get<AuthorFromDB>(`${BASE_URL}api/authors/` + id)
        .then((res) => res.data),
  });
}

export function useUserDTOTodoIds() {
  return useQuery({
    queryKey: ["todoIds"],
    queryFn: (): Promise<{ username: string; todoIds: number[] }> =>
      axios
        .get<{ username: string; todoIds: number[] }>(`${BASE_URL}api/user`)
        .then((res) => res.data),
  });
}

export function useUserDTOQuizIds() {
  return useQuery({
    queryKey: ["quizIds"],
    queryFn: (): Promise<{ username: string; quizzesIds: number[] }> =>
      axios
        .get<{ username: string; quizzesIds: number[] }>(`${BASE_URL}api/user`)
        .then((res) => res.data),
  });
}

export function useUserDTOPomodoroSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: (): Promise<{
      username: string;
      pomodoroSettings: SettingsFromDB;
    }> =>
      axios
        .get<{ username: string; pomodoroSettings: SettingsFromDB }>(
          `${BASE_URL}api/user`
        )
        .then((res) => {
          return res.data;
        }),
  });
}

export function useQuizzes() {
  return useQuery({
    queryKey: ["quizzes"],
    queryFn: (): Promise<QuizFromDB[]> =>
      axios.get<QuizFromDB[]>(`${BASE_URL}api/quizzes`).then((res) => res.data),
  });
}

export function useQuiz(id: number) {
  return useQuery({
    queryKey: ["quizzes", id],
    queryFn: (): Promise<QuizFromDB> =>
      axios
        .get<QuizFromDB>(`${BASE_URL}api/quizzes/` + id)
        .then((res) => res.data),
  });
}

export function useQuestions() {
  return useQuery({
    queryKey: ["questions"],
    queryFn: (): Promise<QuestionFromDB[]> =>
      axios
        .get<QuestionFromDB[]>(`${BASE_URL}api/questions`)
        .then((res) => res.data),
  });
}

export function useQuestion(id: number) {
  return useQuery({
    queryKey: ["questions", id],
    queryFn: (): Promise<QuestionFromDB> =>
      axios
        .get<QuestionFromDB>(`${BASE_URL}api/questions/` + id)
        .then((res) => res.data),
  });
}

export function useAnswers() {
  return useQuery({
    queryKey: ["answers"],
    queryFn: (): Promise<AnswerFromDB[]> =>
      axios
        .get<AnswerFromDB[]>(`${BASE_URL}api/answers`)
        .then((res) => res.data),
  });
}

export function useAnswer(id: number) {
  return useQuery({
    queryKey: ["answers", id],
    queryFn: (): Promise<AnswerFromDB> =>
      axios
        .get<AnswerFromDB>(`${BASE_URL}api/answers/` + id)
        .then((res) => res.data),
  });
}

export function useChatslots() {
  return useQuery({
    queryKey: ["chatslots"],
    queryFn: (): Promise<ChatslotFromDB[]> =>
      axios
        .get<ChatslotFromDB[]>(`${BASE_URL}api/chatslots`)
        .then((res) => res.data),
  });
}

export function useChatslot(id: number) {
  return useQuery({
    queryKey: ["chatslots", id],
    queryFn: (): Promise<ChatslotFromDB> =>
      axios
        .get<ChatslotFromDB>(`${BASE_URL}api/chatslots/${id}`)
        .then((res) => {
          console.log(id);
          return res.data;
        }),
    staleTime: Infinity, // Prevent automatic refetch unless explicitly triggered
    gcTime: Infinity,
  });
}
