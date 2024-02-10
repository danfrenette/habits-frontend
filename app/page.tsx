"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  // throw error if there isn't a session
  if (!session) {
    throw new Error("No session");
  }
}
