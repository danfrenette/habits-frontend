import { Metadata } from "next";

import { Separator } from "@/app/components/ui/separator";
import { SidebarNav } from "@/app/habits/new/SidebarNav";
import { SideNavProvider } from "@/app/lib/contexts/SideNavContext/SideNavContext";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const formSections = ["General", "Cue", "Craving", "Response", "Reward"];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SideNavProvider>
      <div className="space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">New Habit</h2>
          <p className="text-muted-foreground">
            Create a new habit to track your progress.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav formSections={formSections} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </SideNavProvider>
  );
}
