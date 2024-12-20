// app/api/userInfo/route.ts
import { NextResponse } from "next/server";
import { verifySession } from "@/lib/session";
import { sql } from "@vercel/postgres";

export async function GET() {
  const session = await verifySession();
  try {
    const data = await sql`
      SELECT username, todoids, quizzesids
      FROM users
      WHERE userid = ${session.userId}
    `;

    const user = data.rows[0];
    console.log(user);
    return NextResponse.json({
      username: user.username,
      todoIds: user.todoids,
      quizzesIds: user.quizzesids,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
