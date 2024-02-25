"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface TaskTableContextType {
  dueDate: Date;
  setDueDate: Dispatch<SetStateAction<Date>>;
}

const TaskTableContext = createContext<TaskTableContextType | undefined>({
  dueDate: new Date(),
  setDueDate: () => {},
});

export const useTaskTableContext = () => {
  const context = useContext(TaskTableContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export const TaskTableProvider = ({ children }: { children: ReactNode }) => {
  const [dueDate, setDueDate] = useState<Date>(new Date());

  return (
    <TaskTableContext.Provider value={{ dueDate, setDueDate }}>
      {children}
    </TaskTableContext.Provider>
  );
};
