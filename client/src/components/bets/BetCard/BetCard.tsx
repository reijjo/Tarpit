"use client";

import { useState } from "react";

import type { Bet, BetOptions } from "@/lib/types/bets";

import BigCard from "./BigCard/BigCard";
import SmallCard from "./SmallCard/SmallCard";

type BetCardProps = {
  bet: Bet;
  betOptions: BetOptions;
};

export default function BetCard({ bet, betOptions }: BetCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(bet.status);
  const statusStyle =
    status === "half_won" ? "won" : status === "half_lost" ? "lost" : status;

  return (
    <>
      {!isOpen ? (
        <SmallCard
          onOpen={() => setIsOpen(true)}
          onStatusChange={setStatus}
          stake={bet.stake}
          legs={bet.legs}
          odds={bet.finalOdds}
          status={status}
          statusStyle={statusStyle}
        />
      ) : (
        <BigCard
          bet={bet}
          betOptions={betOptions}
          status={status}
          statusStyle={statusStyle}
          onStatusChange={setStatus}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
