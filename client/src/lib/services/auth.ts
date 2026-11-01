import { ApiResponse } from "@/lib/types/api";
import type { RegisterData } from "@/lib/validations/auth";

const REGISTER_API_URL = "/api/v1/auth/register";

export const createUser = async (data: RegisterData): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${REGISTER_API_URL}`,
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
