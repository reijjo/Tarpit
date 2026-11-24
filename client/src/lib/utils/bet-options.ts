import type { BetOption } from "@/lib/types/bets";

export const getOptionName = (
  options: BetOption[],
  id: number | null,
): string => {
  const name = options.find((option) => option.id === id)?.name ?? "";

  if (["nhl", "nba", "mlb", "nfl"].includes(name)) {
    return name.toUpperCase();
  }

  return name.charAt(0).toUpperCase() + name.slice(1);
};
