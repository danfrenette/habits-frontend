"use client";

import { cn } from "@/app/lib/utils";
import * as React from "react";
import { GoogleSignInButton } from "../SignInButtons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <GoogleSignInButton />
    </div>
  );
}
