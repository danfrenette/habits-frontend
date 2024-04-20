import { useUser } from "@clerk/nextjs";

export default async function useCurrentUser() {
  const { user } = await useUser();

  if (!user) {
    throw new Error(
      "useAuthenticatedUser must be used within a <SignedIn> component"
    );
  }

  return { user };
}
