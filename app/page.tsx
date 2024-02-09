"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <h1>Hello, {session.user?.name}</h1>
        <h2>Check out this ID from Rails! {session.user.id}</h2>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        <h1>You are not signed in</h1>
        <button
          className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
      </>
    );
  }
}
