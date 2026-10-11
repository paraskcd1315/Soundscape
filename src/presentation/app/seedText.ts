const SEED_RADIX = 36;

export function seedToText(seed: number): string {
  return (seed >>> 0).toString(SEED_RADIX);
}

export function textToSeed(text: string): number | null {
  const trimmed = text.trim().toLowerCase();
  if (!/^[0-9a-z]{1,7}$/.test(trimmed)) return null;
  const value = parseInt(trimmed, SEED_RADIX);
  return Number.isFinite(value) ? value >>> 0 : null;
}
