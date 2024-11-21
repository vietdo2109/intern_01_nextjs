import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Todo {
  id: number;
  text: string;
  date: string;
  type: "Planned" | "Upcoming" | "Completed";
  tags: number[];
}

const initialState: Todo[] = [
  {
    id: 0,
    text: "Planned task 1",
    type: "Planned",
    date: "Due Date 18 Jan 2024",
    tags: [2, 1, 4],
  },
  {
    id: 1,
    text: "Upcoming task 1",
    type: "Upcoming",
    date: "Due Date 18 Jan 2024",
    tags: [1, 2, 4],
  },
  {
    id: 2,
    text: "Planned task 2",
    type: "Planned",
    date: "Due Date 18 Jan 2024",
    tags: [2, 3, 4],
  },
  {
    id: 3,
    text: "Completed task 1",
    type: "Completed",
    date: "Due Date 18 Jan 2024",
    tags: [1, 2],
  },
];

const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Todo>) => {
      return [...state, action.payload]; // Set the value from the action payload
    },
  },
});

export const { addTask } = todoSlice.actions;

export default todoSlice.reducer;
