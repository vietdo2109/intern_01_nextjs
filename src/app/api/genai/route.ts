import { NextRequest, NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

export async function POST(req: NextRequest) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
