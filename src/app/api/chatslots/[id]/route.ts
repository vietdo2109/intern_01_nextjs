import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { verifySession } from "@/lib/session";

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
  const todoId = params.id;

  try {
    // Retrieve the user ID associated with the todo (if needed for additional checks)
    const session = await verifySession();
    const userId = session.userId;

    // Remove the todo ID from the user's todoids array
    await sql`
      UPDATE users
      SET todoids = array_remove(todoids, ${todoId})
      WHERE userid = ${userId}
    `;

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
