import * as z from "zod";

export const registerSchema = z
  .object({
    email: z
      .email({ error: "Invalid email." })
      .max(150, "Max 150 characters in email"),
    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(3, "Min 3 characters in username")
      .max(30, "Max 30 characters in username")
      .regex(
        /^[a-z0-9_-]+$/,
        "Username can only contain letters, numbers, '-', and '_'",
      ),
    password: z
      .string()
      .min(8, "Min 8 characters in password")
      .max(50, "Max 50 characters in password"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });
