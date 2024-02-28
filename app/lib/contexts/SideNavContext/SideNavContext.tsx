"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface SideNavContextType {
  currentSection: string;
  goToSection: (section: string) => void;
}

const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

export const useSideNav = () => {
  const context = useContext(SideNavContext);
  if (!context) {
    throw new Error("useSideNav must be used within a SideNavProvider");
  }
  return context;
};

export const SideNavProvider = ({
  children,
  defaultSection,
}: {
  children: ReactNode;
  defaultSection: string;
}) => {
  const [currentSection, setCurrentSection] = useState(defaultSection);

  const goToSection = (section: string) => {
    setCurrentSection(section);
  };

  return (
    <SideNavContext.Provider value={{ currentSection, goToSection }}>
      {children}
    </SideNavContext.Provider>
  );
};
