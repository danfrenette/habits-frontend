import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Match all routes except those ending with file extensions or specific Next.js paths
    "/((?!.+\\.[a-zA-Z]+$|_next|api/|trpc/).*)",
  ],
};
