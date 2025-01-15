import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const chatId = params.id;

  try {
    const todo = await sql`SELECT * FROM chats WHERE id = ${chatId}`;
    if (todo.rows.length === 0) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }
    return NextResponse.json(todo.rows[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch chat" },
      { status: 500 }
    );
  }
}

export const PUT = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const chatslotId = params.id;
  const { title, messages } = await request.json(); // Modify fields based on your user table

  try {
    await sql`UPDATE chats SET title = ${title}, messages = ${messages} WHERE id = ${chatslotId}`;
    return NextResponse.json({
      message: "Question updated successfully",
      id: chatslotId,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update chats" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const chatslotId = params.id;

  try {
    await sql`DELETE FROM chats WHERE id = ${chatslotId}`;
    return NextResponse.json({ message: "chatslot deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete chatslot" },
      { status: 500 }
    );
  }
};
