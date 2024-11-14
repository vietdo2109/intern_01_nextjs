import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { BillingInfo } from "@/lib/models/billingInfo";

export const GET = async () => {
  const data = await sql`SELECT * FROM billinginfo`;
  const billings = data.rows;
  return NextResponse.json(billings, { status: 200 });
};

export const POST = async (request: Request) => {
  try {
    const body: BillingInfo = await request.json();
    const { fullname, companyName, email, vatNumber } = body;

    await sql`INSERT INTO billingInfo (fullname, companyname, email, VATNumber) 
                  VALUES (${fullname}, ${companyName},${email},${vatNumber});`;

    return new NextResponse(
      JSON.stringify({ message: "billingInfo is created", author: body }),
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
