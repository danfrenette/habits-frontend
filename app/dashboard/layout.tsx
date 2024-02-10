import { Metadata } from "next";
import Nav from "../components/dashboard/Nav";
import { Search } from "../components/dashboard/Search";
import ModeToggle from "../components/ModeToggle";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col">
        <div className="border-b w-screen">
          <div className="flex h-16 items-center px-8">
            <Nav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
