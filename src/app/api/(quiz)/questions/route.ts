import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const GET = async () => {
  const data = await sql`SELECT * FROM questions`;
  const questions = data.rows;
  console.log(questions);
  return NextResponse.json(questions, { status: 200 });
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { quizid, questiontext, answerids } = body;
    console.log({ quizid, questiontext, answerids });

    const result = await sql`
      INSERT INTO questions (quizid, questiontext, answerids)
        VALUES (${quizid}, ${questiontext}, ${answerids})
        RETURNING id
    `;

    return new NextResponse(
      JSON.stringify({
        message: "new quiz is created",
        id: result.rows[0]?.id,
      }),
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
