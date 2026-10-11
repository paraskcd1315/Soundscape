import type { ChorusVoice } from "../../../types/ChorusVoice";

export const JUNO_PAD_CHORUS: readonly ChorusVoice[] = [
  { type: "sawtooth", cents: -6, rateHz: 0.51, gain: 0.5 },
  { type: "sawtooth", cents: 6, rateHz: 0.83, gain: 0.5 },
  { type: "square", cents: 0, rateHz: 0.67, gain: 0.3 },
];

export const JUNO_PAD_METRICS = {
  peak: 0.07,
  attackSeconds: 0.45,
  releaseSeconds: 1.3,
  cutoffBaseHz: 900,
  cutoffBrightnessHz: 2600,
  resonance: 0.9,
  chorusDepthCents: 9,
  chorus: JUNO_PAD_CHORUS,
} as const;
