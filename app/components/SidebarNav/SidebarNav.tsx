"use client";

import { useSideNav } from "@/app/lib/contexts/SideNavContext/SideNavContext";
import { Button, buttonVariants } from "../../components/ui/button";
import { cn } from "@/app/lib/utils";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  formSections: string[];
}

export function SidebarNav({
  className,
  formSections,
  ...props
}: SidebarNavProps) {
  const { currentSection, goToSection } = useSideNav();

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
