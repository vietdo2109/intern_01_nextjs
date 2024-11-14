import { sql } from "@vercel/postgres";

export async function addTodoId(userId: number, newTodoId: number) {
  try {
    // Update the user's todoIds array by appending the newTodoId
    console.log("adding");
    await sql`
      UPDATE users
      SET todoids = array_append(todoids, ${newTodoId})
      WHERE userid = ${userId}
    `;
    console.log("added new todo id");
    return { success: true, message: "Todo ID added successfully." };
  } catch (error) {
    console.error("Error adding todo ID:", error);
    return { success: false, message: "Failed to add todo ID." };
  }
}
