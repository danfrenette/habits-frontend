import { Metadata } from "next";
import Links from "./Links";
import Search from "./Search";
import ModeToggle from "../ModeToggle";
import { SignOut } from "../SignInButtons";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "All tasks and habits.",
};

export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="border-b w-screen">
        <div className="flex h-16 items-center px-8">
          <Links className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <ModeToggle />
            <SignOut />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
