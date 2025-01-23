import {  Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <div>
    {session ? (
      <div>
        <h1>Welcome!</h1>
        <p>User ID: {session.user?.id}</p>
        <p>Username: {session.user?.username}</p>
      </div>
    ) : (
      <div>
        <h1>You are not signed in.</h1>
      </div>
    )}
  </div>
  );
}
