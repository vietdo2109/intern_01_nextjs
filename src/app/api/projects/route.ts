import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { Project } from "@/lib/models/project";

export const GET = async () => {
  const data = await sql`SELECT * FROM projects`;
  const authors = data.rows;
  return NextResponse.json(authors, { status: 200 });
};

export const POST = async (request: Request) => {
  try {
    const body: Project = await request.json();
    const { companyName, status, budget, completionRate, logo } = body;

    await sql`INSERT INTO projects (companyName, budget, status, completionRate, logo) 
                VALUES (${companyName}, ${budget},${status},${completionRate},${logo});`;

    return new NextResponse(
      JSON.stringify({ message: "Project is created", author: body }),
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
