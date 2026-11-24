import { ApiResponse } from "@/lib/types/api";

export function unwrap<T>(response: ApiResponse<T>): T {
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data;
}
