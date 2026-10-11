import type { MalletPartial } from "../../../types/MalletPartial";

export const MALLET_LIMIT_HZ = 12000;

export const MARIMBA_PARTIALS: readonly MalletPartial[] = [
  { ratio: 1, gain: 1, attackSeconds: 0.002, decayScale: 1 },
  { ratio: 4, gain: 0.25, attackSeconds: 0.001, decayScale: 0.25 },
  { ratio: 10, gain: 0.08, attackSeconds: 0.0005, decayScale: 0.06 },
];

export const MARIMBA_PEAK = 0.2;

export const MARIMBA_DECAY_SECONDS = 0.7;

export const STEEL_DRUM_PARTIALS: readonly MalletPartial[] = [
  { ratio: 1, gain: 1, attackSeconds: 0.004, decayScale: 1 },
  { ratio: 2.02, gain: 0.45, attackSeconds: 0.003, decayScale: 0.7 },
  { ratio: 3.01, gain: 0.25, attackSeconds: 0.002, decayScale: 0.45 },
  { ratio: 4.1, gain: 0.08, attackSeconds: 0.002, decayScale: 0.25 },
];

export const STEEL_DRUM_PEAK = 0.13;

export const STEEL_DRUM_DECAY_SECONDS = 1.1;
