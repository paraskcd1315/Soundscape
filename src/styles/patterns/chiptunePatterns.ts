import type { PatternRules } from "../../domain/model/PatternRules";

export const chiptunePatterns: PatternRules = {
  templateChance: 0.5,
  drums: [
    {
      voice: "kick",
      anchors: [0, 8],
      weights: [0, 0, 0, 0.2, 0, 0, 0.3, 0, 0, 0, 0.6, 0, 0, 0.2, 0.4, 0],
      minExtra: 0,
      maxExtra: 3,
      presence: 1,
    },
    {
      voice: "snare",
      anchors: [4, 12],
      weights: [0, 0, 0, 0, 0, 0, 0, 0.3, 0, 0, 0, 0, 0, 0, 0.3, 0.6],
      minExtra: 0,
      maxExtra: 2,
      presence: 1,
    },
    {
      voice: "hat",
      anchors: [],
      weights: [
        0.9, 0.15, 0.9, 0.15, 0.9, 0.15, 0.9, 0.15, 0.9, 0.15, 0.9, 0.15, 0.9,
        0.15, 0.9, 0.15,
      ],
      minExtra: 8,
      maxExtra: 14,
      presence: 1,
    },
    {
      voice: "perc",
      anchors: [],
      weights: [0, 0.5, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0.5],
      minExtra: 2,
      maxExtra: 5,
      presence: 0.35,
    },
  ],
  bass: {
    anchors: [0, 8],
    weights: [
      0.8, 0.25, 0.8, 0.25, 0.8, 0.25, 0.8, 0.25, 0.8, 0.25, 0.8, 0.25, 0.8,
      0.25, 0.8, 0.25,
    ],
    minExtra: 5,
    maxExtra: 9,
    lengths: [1, 2],
    intervals: [
      { interval: "root", weight: 0.45 },
      { interval: "fifth", weight: 0.2 },
      { interval: "octave", weight: 0.35 },
    ],
    kickInteraction: 0.3,
    walking: false,
  },
  stabs: null,
};
