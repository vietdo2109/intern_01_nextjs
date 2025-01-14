import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { verifySession } from "@/lib/session";

export const GET = async () => {
  const session = await verifySession();

  const data = await sql`SELECT * FROM chats WHERE userid = ${session.userId}`;
  const chats = data.rows;
  return NextResponse.json(chats, { status: 200 });
};

export const POST = async (request: Request) => {
  try {
    const session = await verifySession();

    // Parse the request body
    const body = await request.json();
    const title = body.title || ""; // Default to an empty string if title is not provided
    const messages = body.messages || []; // Default to an empty array if messages are not provided

    // Insert data into the database
    const insertResponse =
      await sql`INSERT INTO chats (title, userid, messages) 
                VALUES (${title}, ${session.userId}, ${messages}::JSONB[])
                RETURNING id;`;

    // Return success response
    return new NextResponse(
      JSON.stringify({
        message: "new chat created",
        id: insertResponse.rows[0].id,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    // Handle errors and return an appropriate response
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
};
