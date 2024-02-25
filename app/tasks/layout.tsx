import { TaskTableProvider } from "../lib/contexts/TaskTableContext/TaskTableContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <TaskTableProvider>{children}</TaskTableProvider>;
}
