import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { verifySession } from "@/lib/session";

export const GET = async () => {
  const data = await sql`SELECT * FROM quizzes`;
  const quizzes = data.rows;
  console.log(quizzes);
  return NextResponse.json(quizzes, { status: 200 });
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { title, description, questionids } = body;
    console.log({ title, description, questionids });
    const session = await verifySession();
    const userId = session.userId;

    const result = await sql`
      INSERT INTO quizzes (userId, title, description, questionids)
        VALUES (${userId}, ${title}, ${description}, ${questionids})
        RETURNING id;
    `;

    const newQuizzId = result.rows[0]?.id; // Safely access the first row's ID

    // Update the user's todoIds by appending the new todo ID
    await sql`
      UPDATE users
      SET quizzesids = array_append(quizzesids, ${newQuizzId})
      WHERE userid = ${userId}
    `;

    return new NextResponse(
      JSON.stringify({ message: "new quiz is created", id: newQuizzId }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
};
