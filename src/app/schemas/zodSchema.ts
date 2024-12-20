import { patterns } from "@/constants/patterns";
import { z } from "zod";

function formatDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, "0");

  // Format the date as 'YYYY-MM-DD'
  return `${year}-${month}-${day}`;
}

export const zodSchema = z.intersection(
  z.object({
    name: z.string().min(1, { message: "Required" }),
    email: z
      .string()
      .min(1, { message: "Required" })
      .refine((text) => patterns.email.test(text), {
        message: "Email not valid",
      }),
    states: z
      .array(z.string())
      .min(1, { message: "Required" })
      .max(2, { message: "maximum 2" }),
    languages: z.array(z.string()).min(1, { message: "Required" }),
    gender: z.string().min(1),
    skills: z.array(z.string()).min(1, { message: "Required" }),
    dob: z.string(),
    FEPeriod: z.array(z.string()).min(2).max(2),
    salaryRange: z.array(z.number()).min(2).max(2),
    isTeacher: z.boolean(),

    students: z
      .array(
        z.object({
          name: z.string().min(4, { message: "At least 4 characters" }),
        })
      )
      .optional(),
  }),

  z.discriminatedUnion("variant", [
    z.object({ variant: z.literal("create") }),
    z.object({ variant: z.literal("edit"), id: z.number().min(1) }),
  ])
);

export type Schema = z.infer<typeof zodSchema>;

export const defaultValues: Schema = {
  variant: "create",
  name: "",
  email: "",
  states: [],
  languages: [],
  gender: "1",
  skills: [],
  dob: formatDate(new Date()),
  FEPeriod: [formatDate(new Date()), formatDate(new Date())],
  salaryRange: [10, 30],
  isTeacher: false,
};

export const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long." })
      .trim(),
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/, {
        message:
          "Must contain at least one letter, one number, and one special character.",
      })
      .trim(),
    repeat_password: z.string().trim(),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Passwords must match.",
    path: ["repeat_password"],
  });

export const LoginFormSchema = z.object({
  email: z.string().min(1, { message: "Email cannot be empty!" }).trim(),
  password: z.string().min(1, { message: "Password cannot be empty!" }),
});
