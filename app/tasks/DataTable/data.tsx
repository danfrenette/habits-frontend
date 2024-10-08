import { CheckCircledIcon, CircleIcon } from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "active",
    label: "Active",
    icon: CircleIcon,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircledIcon,
  },
];
