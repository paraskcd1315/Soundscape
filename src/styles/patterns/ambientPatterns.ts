import type { PatternRules } from "../../domain/model/PatternRules";

export const ambientPatterns: PatternRules = {
  templateChance: 0.7,
  drums: [],
  bass: {
    anchors: [0],
    weights: [0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0, 0],
    minExtra: 0,
    maxExtra: 1,
    lengths: [8, 16],
    intervals: [
      { interval: "root", weight: 0.8 },
      { interval: "fifth", weight: 0.2 },
    ],
    kickInteraction: 0,
    walking: false,
  },
  stabs: null,
};
