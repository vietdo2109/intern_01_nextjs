import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const quizId = params.id;

  try {
    const quiz = await sql`SELECT * FROM quizzes WHERE id = ${quizId}`;
    if (quiz.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(quiz.rows[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch quiz" },
      { status: 500 }
    );
  }
}

export const PUT = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const quizId = (await params).id;
  console.log(quizId);
  const { title, description, questionids } = await request.json(); // Modify fields based on your user table

  console.log(title, description, questionids);
  try {
    await sql`UPDATE quizzes SET title = ${title}, description = ${description}, questionids = ${questionids} WHERE id = ${quizId}`;
    return NextResponse.json({ message: "Quiz updated successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update quiz" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const quizId = params.id;

  try {
    // Retrieve the quiz ID associated with the question
    const selectUserId =
      await sql`SELECT userid FROM quizzes WHERE id = ${quizId}`;
    if (selectUserId.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = selectUserId.rows[0].userid;

    // Remove the questionId from the quizzes table (assuming `questions` is an array column)
    await sql`
      UPDATE users
      SET quizzesids = array_remove(quizzesids, ${quizId})
      WHERE userid = ${userId}
    `;

    // Delete the question from the questions table
    await sql`DELETE FROM quizzes WHERE id = ${quizId}`;

    return NextResponse.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete quiz" },
      { status: 500 }
    );
  }
};
