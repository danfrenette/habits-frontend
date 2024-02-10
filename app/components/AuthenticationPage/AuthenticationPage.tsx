import { Metadata } from "next";
import { UserAuthForm } from ".";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                This is a personal app for tracking habits and managing tasks.
                If you&apos;re interested in using it, please reach out to me
                directly.
              </p>
              <footer className="text-sm">- Dan</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex items-center w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login (if you&apos;re Dan)
              </h1>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
