import type { BetStatus, BetType } from "@/lib/types/bets";
import type { BetLeg } from "@/lib/types/bets";

export const formatBetType = (betType: BetType): string => {
  return betType
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

export const calculateProfit = (
  stake: number,
  odds: number,
  status: BetStatus,
): string => {
  const potentialProfit = stake * (odds - 1);
  let profit = 0;

  switch (status) {
    case "won":
      profit = potentialProfit;
      break;
    case "lost":
      profit = -stake;
      break;
    case "half_won":
      profit = potentialProfit / 2;
      break;
    case "half_lost":
      profit = -stake / 2;
      break;
    case "push":
      profit = 0;
      break;
  }

  return `${profit > 0 ? "+" : ""}${profit.toFixed(2)}u`;
};

export const formatBetDate = (legs: BetLeg[]): string => {
  const latestDate = legs
    .map((leg) => leg.eventDate)
    .sort()
    .at(-1);

  if (!latestDate) return "";

  return latestDate.split("-").reverse().join("/");
};
