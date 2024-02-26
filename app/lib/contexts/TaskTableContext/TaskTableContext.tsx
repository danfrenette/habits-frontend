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
  dueDate: Date | undefined;
  setDueDate: Dispatch<SetStateAction<Date | undefined>>;
}

const TaskTableContext = createContext<TaskTableContextType | undefined>({
  dueDate: new Date(),
  setDueDate: (): SetStateAction<Date> => {
    const today = new Date();
    return today;
  },
});

export const useTaskTableContext = () => {
  const context = useContext(TaskTableContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export const TaskTableProvider = ({ children }: { children: ReactNode }) => {
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  return (
    <TaskTableContext.Provider value={{ dueDate, setDueDate }}>
      {children}
    </TaskTableContext.Provider>
  );
};
