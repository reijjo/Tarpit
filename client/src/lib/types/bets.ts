export type Bet = {
  id: number;
  userId: number;
  stake: number;
  finalOdds: number;
  finalType: FinalType;
  bookmakerId: number | null;
  tipperId: number | null;
  status: BetStatus;
  notes: string | null;
  freebet: boolean;
  legs: BetLeg[];
};

export type BetLeg = {
  id: number;
  betId: number;
  categoryId: number;
  homeTeam: string;
  awayTeam: string;
  eventDate: string;
  livebet: boolean;
  odds: string;
  betType: BetType;
  selections: BetSelection[];
  homeResult: number | null;
  awayResult: number | null;
  result: BetStatus;
};

export type BetSelection = {
  id: string;
  selection: string;
  result: BetStatus | null;
};

export type BetOption = {
  id: number;
  name: string;
};

export type BetOptions = {
  categories: BetOption[];
  bookmakers: BetOption[];
  tippers: BetOption[];
};

// -----------
// Union types
// -----------
export const BET_STATUSES = [
  "pending",
  "won",
  "lost",
  "half_won",
  "half_lost",
  "push",
] as const;

export type BetStatus = (typeof BET_STATUSES)[number];

export const FINAL_TYPES = [
  "single",
  "double",
  "treble",
  "4_fold",
  "parlay_5_plus",
  "multiple_correct_scores",
] as const;

export type FinalType = (typeof FINAL_TYPES)[number];

export const BET_TYPES = [
  "moneyline",
  "three_way",
  "handicap",
  "over",
  "under",
  "bet_builder",
  "btts",
  "other",
  "player_props",
  "correct_score",
  "ladder_challenge",
] as const;

export type BetType = (typeof BET_TYPES)[number];
