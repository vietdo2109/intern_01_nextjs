import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalTypeState } from "@/types/todoModalTypes";
const initialState: ModalTypeState = {
  value: "Planned",
};

const modalTypeSlice = createSlice({
  name: "modalType",
  initialState: initialState,
  reducers: {
    switchModalType: (
      state,
      action: PayloadAction<"Planned" | "Upcoming" | "Completed">
    ) => {
      state.value = action.payload; // Set the value from the action payload
    },
  },
});

export const { switchModalType } = modalTypeSlice.actions;

export default modalTypeSlice.reducer;
