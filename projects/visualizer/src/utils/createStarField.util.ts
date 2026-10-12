import type { OrbitStar } from "../types/OrbitStar";
import { STAR_FIELD, STAR_TINTS } from "./constants/starField.constants";

export function createStarField(count: number): OrbitStar[] {
  let state = STAR_FIELD.seed;
  const next = (): number => {
    state =
      (state * STAR_FIELD.multiplier + STAR_FIELD.increment) %
      STAR_FIELD.modulus;
    return state / STAR_FIELD.modulus;
  };
  const pickTint = (): string => {
    let roll = next();
    for (const tint of STAR_TINTS) {
      roll -= tint.share;
      if (roll <= 0) return tint.rgb;
    }
    return STAR_TINTS[0]?.rgb ?? "255, 255, 255";
  };
  return Array.from({ length: count }, () => {
    const strength = next() ** STAR_FIELD.brightnessExponent;
    return {
      x: next(),
      y: next(),
      size:
        STAR_FIELD.minSize +
        strength * (STAR_FIELD.maxSize - STAR_FIELD.minSize),
      brightness:
        STAR_FIELD.minBrightness + strength * (1 - STAR_FIELD.minBrightness),
      tint: pickTint(),
      twinkles: next() < STAR_FIELD.twinkleShare,
      phase: next() * Math.PI * 2,
      speed:
        STAR_FIELD.minTwinkleHz +
        next() * (STAR_FIELD.maxTwinkleHz - STAR_FIELD.minTwinkleHz),
    };
  });
}
