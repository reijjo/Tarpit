import styles from "./Pile.module.css";

import type { CSSProperties } from "react";

import Image from "next/image";

type Side = "left" | "right";

// ---- SÄÄDÖT ----
const SIZE = 14; // pallon leveys (vw)
const SPACING = 0.45; // keskipisteiden väli, osa pallon leveydestä. Pienempi = tiiviimpi
const ROW_STEP = 0.4; // rivien väli pystysuunnassa, osa pallon koosta
const BASE_WIDTH = 55; // alimman rivin leveys reunasta (vw)
const TAPER = 8; // kuinka paljon kapeampi jokainen rivi on (vw)
const ROWS = 6; // rivien määrä = kasan korkeus
const JITTER = 1.5; // satunnaisuus sijainneissa (vw)
// -----------------

// deterministinen "random", ei hydration-ongelmia
const rand = (n: number) => {
  const v = Math.sin(n * 127.1) * 43758.5453;
  return Math.round((v - Math.floor(v)) * 100) / 100;
};
const jitter = (n: number, range: number) => (rand(n) - 0.5) * 2 * range;

const step = SIZE * SPACING;
let seed = 1;
const balls: {
  e: number;
  y: number;
  s: number;
  r: number;
  b: number;
  z: number;
}[] = [];

for (let row = 0; row < ROWS; row++) {
  const width = BASE_WIDTH - row * TAPER;
  const count = Math.ceil(width / step);
  const stagger = row % 2 ? step / 2 : 0;

  for (let i = 0; i <= count; i++) {
    seed++;
    balls.push({
      e: -SIZE * 0.3 + i * step + stagger + jitter(seed, JITTER),
      y: -SIZE * 0.35 + row * SIZE * ROW_STEP + jitter(seed + 100, JITTER),
      s: SIZE + jitter(seed + 200, SIZE * 0.12),
      r: jitter(seed + 300, 40),
      b: 0.5 + (row / (ROWS - 1)) * 0.25 + jitter(seed + 400, 0.05),
      z: row + 1,
    });
  }
}

export default function Pile({ side }: { side: Side }) {
  const left = side === "left";

  return (
    <div className={styles.pile} aria-hidden="true">
      {balls.map((ball, i) => (
        <Image
          key={i}
          className={styles.ball}
          style={
            {
              "--x": left
                ? `calc(${ball.e}vw * var(--k))`
                : `calc(100% - ${ball.e}vw * var(--k))`,
              "--y": `calc(${ball.y}vw * var(--k) * var(--ky))`,
              "--s": `calc(${ball.s}vw * var(--k))`,
              "--r": `${left ? -ball.r : ball.r}deg`,
              "--b": ball.b,
              "--z": ball.z,
            } as CSSProperties
          }
          src="/images/home/crumpled.webp"
          width={1280}
          height={1250}
          sizes="15vw"
          alt="crumpled excel"
          loading="eager"
        />
      ))}
    </div>
  );
}
