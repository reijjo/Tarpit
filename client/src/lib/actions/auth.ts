"use server";
import * as z from "zod";

import { RegisterFromState } from "@/lib/forms/register-state";
import { createUser } from "@/lib/services/auth";
import { registerSchema } from "@/lib/validations/auth";

export const registerUser = async (
  prevState: RegisterFromState,
  formData: FormData,
): Promise<RegisterFromState> => {
  const validated = registerSchema.safeParse(Object.fromEntries(formData));

  if (!validated.success) {
    return {
      notificationId: prevState.notificationId + 1,
      success: false,
      errors: z.flattenError(validated.error).fieldErrors,
      values: {
        email: String(formData.get("email") ?? ""),
        username: String(formData.get("username") ?? ""),
      },
    };
  }

  const res = await createUser(validated.data);
  if (!res.success) {
    return {
      notificationId: prevState.notificationId + 1,

      success: false,
      message: res.message,
      errors: {
        form: [res.message ?? res.error],
      },
      values: {
        email: validated.data.email,
        username: validated.data.username,
      },
    };
  }

  return {
    notificationId: prevState.notificationId + 1,

    success: true,
    message: `Check your email '${validated.data.email}' to verify your account`,
    errors: {},
    values: {
      email: validated.data.email,
      username: validated.data.username,
    },
  };
};
