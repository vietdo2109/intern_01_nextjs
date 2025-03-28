import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const answerId = params.id;

  try {
    const answer = await sql`SELECT * FROM answers WHERE id = ${answerId}`;
    if (answer.rows.length === 0) {
      return NextResponse.json({ error: "answer not found" }, { status: 404 });
    }
    return NextResponse.json(answer.rows[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch answer" },
      { status: 500 }
    );
  }
}

export const PUT = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const answerId = (await params).id;
  const { answertext, iscorrect, questionid } = await request.json(); // Modify fields based on your user table

  try {
    await sql`UPDATE answers SET answertext = ${answertext}, iscorrect = ${iscorrect} WHERE id = ${answerId}`;
    return NextResponse.json({
      message: "answer updated successfully",
      id: answerId,
      questionId: questionid,
      answerText: answertext,
      isCorrect: iscorrect,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update answer" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const answerId = params.id;

  try {
    await sql`DELETE FROM answers WHERE id = ${answerId}`;
    return NextResponse.json({
      message: "answer deleted successfully",
      answerId: answerId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete asnwer" },
      { status: 500 }
    );
  }
};
