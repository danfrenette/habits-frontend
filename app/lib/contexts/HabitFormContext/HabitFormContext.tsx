"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

export type FormSection = "General" | "Cue" | "Craving" | "Response" | "Reward";

interface HabitFormContextType {
  currentSection: FormSection;
  goToSection: (section: FormSection) => void;
}

const HabitFormContext = createContext<HabitFormContextType | undefined>(
  undefined
);

export const useHabitForm = () => {
  const context = useContext(HabitFormContext);
  if (!context) {
    throw new Error("useHabitForm must be used within a HabitFormProvider");
  }
  return context;
};

export const HabitFormProvider = ({ children }: { children: ReactNode }) => {
  const [currentSection, setCurrentSection] = useState<FormSection>("General");

  const goToSection = (section: FormSection) => {
    setCurrentSection(section);
  };

  return (
    <HabitFormContext.Provider value={{ currentSection, goToSection }}>
      {children}
    </HabitFormContext.Provider>
  );
};
