export const STAR_FIELD = {
  seed: 20_261_012,
  multiplier: 48_271,
  increment: 0,
  modulus: 2_147_483_647,
  minSize: 0.4,
  maxSize: 1.9,
  minBrightness: 0.12,
  brightnessExponent: 3,
  twinkleShare: 0.6,
  twinkleDepth: 0.35,
  minTwinkleHz: 0.2,
  maxTwinkleHz: 1.4,
  glowAbove: 0.75,
} as const;

import type { StarTint } from "../../types/StarTint";

export const STAR_TINTS: readonly StarTint[] = [
  { rgb: "255, 255, 255", share: 0.55 },
  { rgb: "214, 226, 255", share: 0.2 },
  { rgb: "255, 244, 220", share: 0.15 },
  { rgb: "255, 220, 190", share: 0.1 },
];
