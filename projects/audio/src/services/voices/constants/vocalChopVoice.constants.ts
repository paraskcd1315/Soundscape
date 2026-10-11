export const VOCAL_CHOP_METRICS = {
  peak: 0.5,
  attackSeconds: 0.012,
  minimumDecaySeconds: 0.2,
  maximumDecaySeconds: 0.55,
  scoopCents: -60,
  scoopSeconds: 0.06,
  formants: [
    { hz: 730, q: 7, gain: 1 },
    { hz: 1090, q: 8, gain: 0.6 },
    { hz: 2440, q: 10, gain: 0.25 },
  ],
} as const;
