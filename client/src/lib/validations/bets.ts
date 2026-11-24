import * as z from "zod";

import { BET_STATUSES, BET_TYPES, FINAL_TYPES } from "@/lib/types/bets";

export const betSelectionSchema = z.object({
  id: z.string().min(1, "Invalid selection ID"),
  selection: z
    .string()
    .trim()
    .min(1, "Min 1 character")
    .max(100, "Max 100 characters"),
  result: z.enum(BET_STATUSES).nullish(),
});

export const betLegSchema = z
  .object({
    category: z
      .string()
      .trim()
      .min(2, "Min 2 characters")
      .max(30, "Max 30 characters"),
    homeTeam: z
      .string()
      .trim()
      .min(2, "Min 2 characters")
      .max(30, "Max 30 characters"),
    awayTeam: z
      .string()
      .trim()
      .min(2, "Min 2 characters")
      .max(30, "Max 30 characters"),
    eventDate: z.iso.date(),
    livebet: z.boolean(),
    odds: z.number().positive("No negative numbers"),
    betType: z.enum(BET_TYPES),
    selections: z.array(betSelectionSchema),
    homeResult: z.number().int().nonnegative("No negative numbers").nullish(),
    awayResult: z.number().int().nonnegative("No negative numbers").nullish(),
    result: z.enum(BET_STATUSES).nullish(),
  })
  .refine(
    (leg) =>
      leg.betType === "bet_builder"
        ? leg.selections.length >= 2
        : leg.selections.length === 1,
    {
      message: "Bet Builder requires 2+ selections, other bets exactly 1",
      path: ["selections"],
    },
  )
  .refine(
    (leg) =>
      new Set(leg.selections.map((selection) => selection.id)).size ===
      leg.selections.length,
    {
      message: "Selection IDs must be unique",
      path: ["selections"],
    },
  );

export const betSchema = z.object({
  stake: z.number().positive("No negative numbers"),
  finalOdds: z.number().positive("No negative numbers"),
  finalType: z.enum(FINAL_TYPES),
  bookmaker: z
    .string()
    .trim()
    .min(2, "Min 2 characters")
    .max(30, "Max 30 characters")
    .optional(),
  tipper: z
    .string()
    .trim()
    .min(2, "Min 2 characters")
    .max(30, "Max 30 characters")
    .optional(),
  notes: z.string().trim().max(255, "Max 255 characters").optional(),
  freebet: z.boolean(),
  legs: z.array(betLegSchema).min(1, "Bet must contain at least one leg"),
});

export type BetSelectionData = z.infer<typeof betSelectionSchema>;
export type BetLegData = z.infer<typeof betLegSchema>;
export type BetData = z.infer<typeof betSchema>;
