"use client";

import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors",
            pathname === link.href
              ? "text-primary"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
