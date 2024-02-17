"use client";

import {
  FormSection,
  useHabitForm,
} from "@/app/lib/contexts/HabitFormContext/HabitFormContext";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/app/lib/utils";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  formSections: FormSection[];
}

export function SidebarNav({
  className,
  formSections,
  ...props
}: SidebarNavProps) {
  const { currentSection, goToSection } = useHabitForm();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {formSections.map((section) => (
        <Button
          key={section}
          onClick={() => goToSection(section)}
          variant="ghost"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            currentSection === section
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {section}
        </Button>
      ))}
    </nav>
  );
}
