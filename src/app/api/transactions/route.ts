import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { Transaction } from "@/lib/models/transaction";

export const GET = async () => {
  const data = await sql`SELECT * FROM transactions`;
  const transactions = data.rows;
  return NextResponse.json(transactions, { status: 200 });
};

export const POST = async (request: Request) => {
  try {
    const body: Transaction = await request.json();
    const { date, companyName, value } = body;
    const formattedEmployedDate = new Date(date).toISOString();

    await sql`INSERT INTO transactions (companyName, date, value) 
                  VALUES (${companyName}, ${formattedEmployedDate},${value});`;

    return new NextResponse(
      JSON.stringify({ message: "Transaction is created", author: body }),
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
