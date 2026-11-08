import { cookies } from "next/headers";

import { ApiResponse } from "@/lib/types/api";
import type { LoginData, RegisterData } from "@/lib/validations/auth";

import { User } from "../types/user";

const AUTH_API_URL = "/api/v1/auth";

export const createUser = async (data: RegisterData): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${AUTH_API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result: ApiResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to create user",
      };
    }

    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      error: "An error occurred while creating the user",
    };
  }
};

export const loginUser = async (
  data: LoginData,
): Promise<{ result: ApiResponse; sessionCookie: string | null }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${AUTH_API_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(data),
      },
    );

    const result: ApiResponse = await response.json();

    if (!response.ok) {
      return {
        result: {
          success: false,
          error: result.message || "Failed to log in",
        },
        sessionCookie: null,
      };
    }

    const sessionCookie =
      response.headers
        .getSetCookie()
        .find((cookie) => cookie.startsWith("id="))
        ?.split(";")[0] ?? null;

    return { result, sessionCookie };
  } catch (error) {
    console.error("Error during login: ", error);

    return {
      result: {
        success: false,
        error: "Please try again.",
      },
      sessionCookie: null,
    };
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const sessionCookie = (await cookies()).get("id");

  if (!sessionCookie) {
    return null;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${AUTH_API_URL}/me`,
    {
      headers: {
        Cookie: `id=${sessionCookie.value}`,
      },
      cache: "no-store",
    },
  );

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Login session problems.");
  }

  const result: ApiResponse<User> = await response.json();
  return result.success ? result.data : null;
};

export const logoutUser = async (sessionId: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${AUTH_API_URL}/logout`,
      {
        method: "POST",
        headers: {
          Cookie: `id=${sessionId}`,
        },
        cache: "no-store",
      },
    );

    return response.ok;
  } catch (error) {
    console.error("Error during logout:", error);
    return false;
  }
};
