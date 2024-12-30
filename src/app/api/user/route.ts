// app/api/userInfo/route.ts
import { NextResponse } from "next/server";
import { verifySession } from "@/lib/session";
import { sql } from "@vercel/postgres";

export async function GET() {
  const session = await verifySession();
  try {
    const data = await sql`
      SELECT username, todoids, quizzesids, pomodorosettings
      FROM users
      WHERE userid = ${session.userId}
    `;

    const user = data.rows[0];
    return NextResponse.json({
      username: user.username,
      todoIds: user.todoids,
      quizzesIds: user.quizzesids,
      pomodoroSettings: user.pomodorosettings,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}

export const PUT = async (request: Request) => {
  const session = await verifySession();

  // Destructure the settings fields from the request body
  const {
    focusLength,
    shortBreakLength,
    longBreakLength,
    pomoUntilLongBreakLength,
    autoResumeTime,
    sound,
  } = await request.json();

  // Create the JSON object for the settings
  const pomodoroSettings = {
    focuslength: focusLength,
    shortbreaklength: shortBreakLength,
    longbreaklength: longBreakLength,
    pomountillongbreaklength: pomoUntilLongBreakLength,
    autoresumetime: autoResumeTime,
    sound: sound,
  };

  try {
    // Update the pomodoroSettings field in the users table
    await sql`UPDATE users
    SET pomodoroSettings = ${JSON.stringify(pomodoroSettings)}::JSONB
    WHERE userid = ${session.userId}`;

    return NextResponse.json({
      message: "Pomodoro settings updated successfully",
    });
  } catch (error) {
    console.error("Error updating pomodoro settings:", error);
    return NextResponse.json(
      { error: "Failed to update pomodoro settings" },
      { status: 500 }
    );
  }
};

// export const DELETE = async (
//   request: Request,
//   { params }: { params: { id: number } }
// ) => {
//   const todoId = params.id;

//   try {
//     // Retrieve the user ID associated with the todo (if needed for additional checks)
//     const session = await verifySession();
//     const userId = session.userId;

//     // Remove the todo ID from the user's todoids array
//     await sql`
//       UPDATE users
//       SET todoids = array_remove(todoids, ${todoId})
//       WHERE userid = ${userId}
//     `;

//     await sql`DELETE FROM todos WHERE id = ${todoId}`;
//     return NextResponse.json({ message: "todo deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to delete todo" },
//       { status: 500 }
//     );
//   }
// };
