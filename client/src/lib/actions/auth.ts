"use server";
import * as z from "zod";

import { RegisterFromState } from "../forms/register-state";
import { registerSchema } from "../validations/auth";

export const registerUser = async (
  _prevState: RegisterFromState,
  formData: FormData,
): Promise<RegisterFromState> => {
  const validated = registerSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  });

  // 	const validated = registerSchema.safeParse(
  //   Object.fromEntries(formData),
  // );

  console.log("validated", validated.data);

  if (!validated.success) {
    return {
      success: false,
      errors: z.flattenError(validated.error).fieldErrors,
      values: {
        email: String(formData.get("email") ?? ""),
        username: String(formData.get("username") ?? ""),
      },
    };
  }

  return {
    success: true,
    message: "Check your email to verify your account",
    errors: {},
    values: {
      email: validated.data.email,
      username: validated.data.username,
    },
  };
};
