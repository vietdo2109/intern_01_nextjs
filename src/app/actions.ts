// "use server";

// // src/app/actions/todosActions.ts
// import { revalidatePath } from "next/cache";
// import { Todo } from "./state/todo/todoSlice";

// const API_URL = "http://localhost:8080/todos";

// function nextTodoId(todos: Todo[]) {
//   const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
//   return maxId + 1;
// }
// export async function createTodoAction(todo: Todo) {

// }

// export async function deleteTodoAction(id: number) {
//   const res = await fetch(`${API_URL}/${id}`, {
//     method: "DELETE",
//   });
//   if (!res.ok) throw new Error("Failed to delete todo");

//   revalidatePath("/todolistnext"); // Revalidate the specific path after mutation
// }

// export async function updateTodoAction(id: number, todo: Partial<Todo>) {
//   const res = await fetch(`${API_URL}/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(todo),
//   });
//   if (!res.ok) throw new Error("Failed to update todo");
//   const data = await res.json();

//   revalidatePath("/todolistnext"); // Revalidate the specific path after mutation
//   return data;
// }
