import { SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return <div>You are not logged in</div>;
  }

  return (
    <div>
      <h1>Home</h1>

      <div>
        <p>Welcome {user.fullName}</p>
      </div>
      <SignOutButton />
    </div>
  );
}
