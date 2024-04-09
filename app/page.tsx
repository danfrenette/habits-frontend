"use client";

import { useSession } from "next-auth/react";
import { SignOutButton } from "./components/SignInButtons/";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome {session?.user.name}</p>
      <SignOutButton />
    </div>
  );
}
