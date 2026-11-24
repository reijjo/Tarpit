import { cookies } from "next/headers";

export const getSessionHeaders = async (): Promise<HeadersInit> => {
  const id = (await cookies()).get("id")?.value;

  return id ? { Cookie: `id=${id}` } : {};
};
