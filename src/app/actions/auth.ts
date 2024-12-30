"use server";

import { SignupFormSchema, LoginFormSchema } from "@/schemas/zodSchema";
import { LogInFormState } from "@/types/login";
import { SignUpFormState } from "@/types/signUp";
import { sql } from "@vercel/postgres";
import { createSession, deleteSession } from "@/lib/session";

import { redirect } from "next/navigation";
export async function signup(state: SignUpFormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    repeat_password: formData.get("repeat_password"),
  });

  // If validation fails, return errors state
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
      INSERT INTO Users (Username, Email, Password, todoids, quizzesids)
      VALUES (${username}, ${email}, ${password}, '{}', '{}')
      RETURNING userid
    `;

    const user = data.rows[0];
    // If user creation fails, return an error message
    if (!user) {
      return {
        message: "An error occurred while creating your account.",
      };
    }

    await createSession(user.userid);
  } catch (error) {
    console.error("Signup error:", error);
    return {
      message: "An error occurred. Please try again later.",
    };
  }
  redirect("/dashboard");
}

export async function login(state: LogInFormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If validation fails, return errors state
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  try {
    const data = await sql`
      SELECT userid, password
      FROM users 
      WHERE email = ${email}
        AND password  = ${password} 
    `;

    const user = data.rows[0];

    // If user or password is incorrect, return an error message
    if (!user) {
      return {
        message: "Incorrect email or password",
      };
    }
    await createSession(user.userid);
    // const userDTO = await getUserInfo();

    // Return success message and user ID if login is successful
    return {
      message: "Log in successfully!",
      userId: user.userid,
      // userDTO,
    };
  } catch (error) {
    console.error("Log in error:", error);
    return {
      message: "An error occurred. Please try again later.",
    };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

import { cookies } from "next/headers";

export async function getCookieSession() {
  // Get all cookies
  const cookieStore = cookies();

  // Retrieve specific session cookie (replace 'session-cookie-name' with your actual cookie name)
  const sessionCookie = cookieStore.get("session");

  if (sessionCookie) {
    return sessionCookie.value; // Return the value of the session cookie
  } else {
    return null; // Return null if session cookie is not found
  }
}
