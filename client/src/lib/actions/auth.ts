"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import * as z from "zod";

import { LoginFromState } from "@/lib/forms/login-state";
import { RegisterFromState } from "@/lib/forms/register-state";
import { createUser, loginUser, logoutUser } from "@/lib/services/auth";
import { loginSchema, registerSchema } from "@/lib/validations/auth";

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

export const signIn = async (
  prevState: LoginFromState,
  formData: FormData,
): Promise<LoginFromState> => {
  const validated = loginSchema.safeParse(Object.fromEntries(formData));

  if (!validated.success) {
    return {
      notificationId: prevState.notificationId + 1,
      success: false,
      errors: z.flattenError(validated.error).fieldErrors,
      values: {
        login: String(formData.get("login") ?? ""),
      },
    };
  }

  const { result, sessionCookie } = await loginUser(validated.data);

  if (!result.success) {
    return {
      notificationId: prevState.notificationId + 1,
      success: false,
      message: result.message,
      errors: {
        form: [result.message ?? result.error],
      },
      values: {
        login: validated.data.login,
      },
    };
  }

  if (!sessionCookie) {
    return {
      notificationId: prevState.notificationId + 1,
      success: false,
      errors: {
        form: ["Cookie problems, please try again."],
      },
      values: {
        login: validated.data.login,
      },
    };
  }

  const separator = sessionCookie.indexOf("=");
  const cookieName = sessionCookie.slice(0, separator);
  const cookieValue = sessionCookie.slice(separator + 1);

  const cookieStore = await cookies();
  cookieStore.set(cookieName, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  redirect("/dashboard");
};

export const signOut = async () => {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get("id");

  if (sessionCookie) {
    const okLogout = await logoutUser(sessionCookie.value);

    if (!okLogout) {
      console.error("Problems removing cookie");
    }

    (await cookieStore).delete("id");
    redirect("/");
  }
};
