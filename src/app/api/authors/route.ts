import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const GET = async () => {
  const data = await sql`SELECT * FROM authors`;
  const authors = data.rows;
  return NextResponse.json(authors, { status: 200 });
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const {
      fullName,
      function1,
      function2,
      email,
      status,
      employedDate,
      avatar,
    } = body;
    const formattedEmployedDate = new Date(employedDate).toISOString();

    await sql`INSERT INTO authors (fullname, email, function1, function2, status, employedDate, avatar) 
                VALUES (${fullName}, ${email},${function1},${function2},${status},${formattedEmployedDate},${avatar});`;

    return new NextResponse(
      JSON.stringify({ message: "Author is created", author: body }),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
};
