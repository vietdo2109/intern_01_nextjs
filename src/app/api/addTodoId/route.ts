// app/api/addTodoId/route.ts
import { NextResponse } from "next/server";
import { addTodoId } from "@/actions/mutateUserTodoIds";

export async function POST(request: Request) {
  const { userId, newTodoId } = await request.json();
  const result = await addTodoId(userId, newTodoId);
  return NextResponse.json(result);
}
