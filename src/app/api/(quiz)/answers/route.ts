import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const GET = async () => {
  const data = await sql`SELECT * FROM answers`;
  const answers = data.rows;
  console.log(answers);
  return NextResponse.json(answers, { status: 200 });
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { answertext, iscorrect, questionid } = body;
    console.log({ answertext, iscorrect });
    // const session = await verifySession();
    // const userId = session.userId;

    const result = await sql`
      INSERT INTO answers (questionid, answertext, iscorrect)
        VALUES (${questionid}, ${answertext}, ${iscorrect})
        RETURNING id;
    `;

    // const newQuizzId = result.rows[0]?.id; // Safely access the first row's ID

    // // Update the user's todoIds by appending the new todo ID
    // await sql`
    //   UPDATE users
    //   SET todoids = array_append(quizzesids, ${newQuizzId})
    //   WHERE userid = ${userId}
    // `;

    return new NextResponse(
      JSON.stringify({
        message: "new answer is created",
        id: result.rows[0]?.id,
        body,
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
