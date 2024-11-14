import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// GET /api/users/[id] - Retrieve a single user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authorId = params.id;

  try {
    const author = await sql`SELECT * FROM authors WHERE id = ${authorId}`;
    if (author.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(author.rows[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const authorId = (await params).id;
  console.log(authorId);
  const {
    fullName,
    function1,
    function2,
    email,
    status,
    employedDate,
    avatar,
  } = await request.json(); // Modify fields based on your user table

  console.log(
    fullName,
    function1,
    function2,
    email,
    status,
    employedDate,
    avatar
  );
  try {
    await sql`UPDATE authors SET fullname = ${fullName}, email = ${email}, function1 = ${function1},
      function2 = ${function2},status = ${status}, employeddate = ${employedDate}, avatar = ${avatar} WHERE id = ${authorId}`;
    return NextResponse.json({ message: "Author updated successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update author" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const authorId = params.id;

  try {
    await sql`DELETE FROM authors WHERE id = ${authorId}`;
    return NextResponse.json({ message: "Author deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete author" },
      { status: 500 }
    );
  }
};
