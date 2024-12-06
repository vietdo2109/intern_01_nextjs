"use client";
import { createContext, useState, useContext } from "react";

export type TaskType = "Planned" | "Upcoming" | "Completed";

// Define the context type
type ModalTypeContextType = {
  modalType: TaskType;
  setModaltype: React.Dispatch<React.SetStateAction<TaskType>>;
};

const ModalTypeContext = createContext<ModalTypeContextType | undefined>(
  undefined
);

export function ModalTypeProvider({ children }: { children: React.ReactNode }) {
  const [modalType, setModaltype] = useState<TaskType>("Completed");

  return (
    <ModalTypeContext.Provider value={{ modalType, setModaltype }}>
      {children}
    </ModalTypeContext.Provider>
  );
}

export function useModalType() {
  const context = useContext(ModalTypeContext);
  if (!context) {
    throw new Error("useModalType must be used within a ModalTypeProvider");
  }
  return context;
}
