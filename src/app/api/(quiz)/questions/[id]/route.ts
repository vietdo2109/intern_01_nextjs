import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const questionId = params.id;

  try {
    const question =
      await sql`SELECT * FROM questions WHERE id = ${questionId}`;
    if (question.rows.length === 0) {
      return NextResponse.json(
        { error: "question not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(question.rows[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch question" },
      { status: 500 }
    );
  }
}

export const PUT = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const questionId = (await params).id;
  const { questiontext, answerids, quizid } = await request.json(); // Modify fields based on your user table

  try {
    await sql`UPDATE questions SET questiontext = ${questiontext}, answerids = ${answerids} WHERE id = ${questionId}`;
    return NextResponse.json({
      message: "Question updated successfully",
      id: questionId,
      quizId: quizid,
      questionText: questiontext,
      answerIds: answerids,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update question" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const questionId = params.id;

  try {
    // Retrieve the quiz ID associated with the question
    const selectQuizId =
      await sql`SELECT quizid FROM questions WHERE id = ${questionId}`;
    if (selectQuizId.rows.length === 0) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    const quizId = selectQuizId.rows[0].quizid;

    // Remove the questionId from the quizzes table (assuming `questions` is an array column)
    await sql`
      UPDATE quizzes
      SET questionids = array_remove(questionids, ${questionId})
      WHERE id = ${quizId}
    `;

    // Delete the question from the questions table
    await sql`DELETE FROM questions WHERE id = ${questionId}`;

    return NextResponse.json({
      message: "Question deleted successfully",
      questionId: questionId,
      quizId: quizId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete question" },
      { status: 500 }
    );
  }
};
