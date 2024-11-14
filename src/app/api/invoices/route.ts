import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { Invoice } from "@/lib/models/invoice";

export const GET = async () => {
  const data = await sql`SELECT * FROM invoices`;
  const invoices = data.rows;
  return NextResponse.json(invoices, { status: 200 });
};

export const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as Invoice;
    const { date, code, value } = body;
    const formattedEmployedDate = new Date(date).toISOString();

    await sql`INSERT INTO invoices (date, code, value) 
                  VALUES (${formattedEmployedDate}, ${code},${value});`;

    return new NextResponse(
      JSON.stringify({ message: "Invoice is created", author: body }),
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
