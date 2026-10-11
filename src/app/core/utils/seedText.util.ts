import { APP_CONSTANTS, SEED_TEXT_PATTERN } from "../constants/app.constants";

export function seedToText(seed: number): string {
  return (seed >>> 0).toString(APP_CONSTANTS.seedRadix);
}

export function textToSeed(text: string): number | null {
  const trimmed = text.trim().toLowerCase();
  if (!SEED_TEXT_PATTERN.test(trimmed)) return null;
  const value = parseInt(trimmed, APP_CONSTANTS.seedRadix);
  return Number.isFinite(value) ? value >>> 0 : null;
}
