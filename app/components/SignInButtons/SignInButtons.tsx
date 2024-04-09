"use client";

import Image from "next/image";
import googleLogo from "@/public/google.svg";
import { signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";

export function GoogleSignInButton() {
  return (
    <Button onClick={() => signIn("google")}>
      <Image src={googleLogo} alt="google Logo" width={20} height={20} />
      <span className="ml-4">Continue with Google</span>
    </Button>
  );
}

export function SignOutButton() {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
}
