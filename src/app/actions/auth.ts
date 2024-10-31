"use server";

import { SignupFormSchema } from "@/schemas/zodSchema";
import { FormState } from "@/types/signUpPage";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    repeat_password: formData.get("repeat_password"),
  });

  // If validation fails, return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validatedFields.data;

  try {
    // 2. Hash the user's password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert the user into the database using raw SQL
    const data = await sql`
      INSERT INTO Users (Username, Email, Password)
      VALUES (${username}, ${email}, ${password})
      RETURNING userid
    `;

    const user = data.rows[0];

    // If user creation fails, return an error message
    if (!user) {
      return {
        message: "An error occurred while creating your account.",
      };
    }

    // 4. Return success message if user is created
    return {
      message: "Account created successfully!",

      userId: user.id,
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      message: "An error occurred. Please try again later.",
    };
  }
}
