"use client";

import Image from "next/image";
import googleLogo from "@/public/google.svg";
import { Button } from "../ui/button";
import { useSignIn } from "@clerk/nextjs";

export function GoogleSignInButton() {
  const { signIn, isLoaded } = useSignIn();
  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = async () => {
    const result = await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/",
      redirectUrlComplete: "/",
    });
  };

  return (
    <Button onClick={signInWithGoogle}>
      <Image src={googleLogo} alt="google Logo" width={20} height={20} />
      <span className="ml-4">Continue with Google</span>
    </Button>
  );
}

export function SignOutButton() {
  return <Button>Sign Out</Button>;
}
