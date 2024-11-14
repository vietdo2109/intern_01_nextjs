import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/types/login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const cookie = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
  },
  duration: 14 * 60 * 60 * 1000,
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createSession(userId: string) {
  console.log("createSession triggered");

  const expires = new Date(Date.now() + cookie.duration);
  const sessionPayload: SessionPayload = { userId, expires };
  console.log(sessionPayload);
  // Encrypt the session with userId and expires fields
  const session = await encrypt(sessionPayload);
  console.log(cookie.name, session, { ...cookie.options, expires });
  console.log(session);
  // Set the cookie using the Next.js headers API
  cookies().set(cookie.name, session, { ...cookie.options, expires });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function verifySession() {
  console.log("verifySession triggered");
  const cookieValue = cookies().get(cookie.name)?.value;
  const session = await decrypt(cookieValue);

  if (!session?.userId) {
    redirect("/login");
  }
  return { userId: session.userId as number };
}

export async function deleteSession() {
  cookies().delete(cookie.name);
  redirect("/login");
}
