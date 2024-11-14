import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Option } from "../../types/mediumForm/option";
import { ApiGet } from "../../types/mediumForm/apiTypes";
import { Schema } from "@/schemas/zodSchema";
import { Todo } from "@/state/todo/todoSlice";

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
      axios
        .get<Todo[]>("https://intern-01-fake-backend.onrender.com/todos")
        .then((res) => res.data),
  });
}

export function useTodo(id: number) {
  return useQuery({
    queryKey: ["todos", id],
    queryFn: (): Promise<Todo> =>
      axios
        .get<Todo>("https://intern-01-fake-backend.onrender.com/todos/" + id)
        .then((res) => res.data),
  });
}
