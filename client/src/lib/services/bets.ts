import { ApiResponse } from "@/lib/types/api";
import { Bet, BetOptions } from "@/lib/types/bets";

import { getSessionHeaders } from "../utils/session";

const BETS_API_URL = "/api/v1/bets";

export const getBets = async (): Promise<ApiResponse<Bet[]>> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${BETS_API_URL}`,
      {
        headers: await getSessionHeaders(),
        cache: "no-store",
      },
    );

    const result: ApiResponse<Bet[]> = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to get bets",
      };
    }

    return result;
  } catch (error) {
    console.error("Error fetching bets: ", error);
    return {
      success: false,
      error: "Something went wrong with the bets. Try again.",
    };
  }
};

export const getBetOptions = async (): Promise<ApiResponse<BetOptions>> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${BETS_API_URL}/options`,
      {
        headers: await getSessionHeaders(),
        cache: "no-store",
      },
    );

    const result: ApiResponse<BetOptions> = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to get bet options",
      };
    }

    return result;
  } catch (error) {
    console.error("Error fetching bet options:", error);

    return {
      success: false,
      error: "Something went wrong with the bet options.",
    };
  }
};

export const getBetsPageData = async () => {
  const [bets, options] = await Promise.all([getBets(), getBetOptions()]);

  return { bets, options };
};
