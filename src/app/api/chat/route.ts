import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const result = streamText({
      model: google("gemini-2.0-flash-exp"),
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.log(error);
  }
}
