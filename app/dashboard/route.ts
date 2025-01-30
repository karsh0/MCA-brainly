import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {

  const session = await getServerSession(authOptions);


  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }


  return NextResponse.json({
    message: "Welcome to your dashboard!",
    user: session.user
  });
}