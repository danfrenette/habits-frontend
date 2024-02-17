"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome {session?.user.name}</p>
    </div>
  );
}
