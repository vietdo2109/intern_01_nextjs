import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { verifySession } from "@/lib/session";

export const GET = async () => {
  const data = await sql`SELECT * FROM todos`;
  const todos = data.rows;
  return NextResponse.json(todos, { status: 200 });
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { text, date, type, tags } = body;
    const session = await verifySession();
    const userId = session.userId;

    const result = await sql`
      INSERT INTO todos (text, date, type, tags)
      VALUES (${text}, ${date}, ${type}, ${tags})
      RETURNING id
    `;

    const newTodoId = result.rows[0]?.id; // Safely access the first row's ID

    // Update the user's todoIds by appending the new todo ID
    await sql`
      UPDATE users
      SET todoids = array_append(todoids, ${newTodoId})
      WHERE userid = ${userId}
    `;

    return new NextResponse(
      JSON.stringify({ message: "Todo is created", author: body }),
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
