import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const tododId = params.id;

  try {
    const todo = await sql`SELECT * FROM todos WHERE id = ${tododId}`;
    if (todo.rows.length === 0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(todo.rows[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch todo" },
      { status: 500 }
    );
  }
}

export const PUT = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const todoId = (await params).id;
  console.log(todoId);
  const { text, type, date, tags } = await request.json(); // Modify fields based on your user table

  console.log(text, type, date, tags);
  try {
    await sql`UPDATE todos SET text = ${text}, type = ${type}, date = ${date},
      tags = ${tags} WHERE id = ${todoId}`;
    return NextResponse.json({ message: "Todo updated successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const todoId = params.id;

  try {
    await sql`DELETE FROM todos WHERE id = ${todoId}`;
    return NextResponse.json({ message: "todo deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
};
