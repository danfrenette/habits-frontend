"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <h1>Hello, {session.user?.name}</h1>
      <h2>Check out this ID from Rails! {session.user.id}</h2>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}
