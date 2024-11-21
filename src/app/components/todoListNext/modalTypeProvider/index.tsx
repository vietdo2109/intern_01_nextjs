"use client";
import { createContext, useState, useContext } from "react";

// Define the context type
type ModalTypeContextType = {
  modalType: "Planned" | "Upcoming" | "Completed";
  setModaltype: React.Dispatch<
    React.SetStateAction<"Planned" | "Upcoming" | "Completed">
  >;
};

const ModalTypeContext = createContext<ModalTypeContextType | undefined>(
  undefined
);

export function ModalTypeProvider({ children }: { children: React.ReactNode }) {
  const [modalType, setModaltype] = useState<
    "Planned" | "Upcoming" | "Completed"
  >("Completed");

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
