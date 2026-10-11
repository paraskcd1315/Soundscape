import type { PatternRules } from "../../domain/model/PatternRules";

export const lofiPatterns: PatternRules = {
  templateChance: 0.45,
  drums: [
    {
      voice: "kick",
      anchors: [0],
      weights: [
        0, 0, 0.1, 0.2, 0, 0.2, 0.3, 0.5, 0, 0.5, 0.8, 0.2, 0, 0.2, 0.3, 0.5,
      ],
      minExtra: 1,
      maxExtra: 3,
      presence: 1,
    },
    {
      voice: "snare",
      anchors: [4, 12],
      weights: [0, 0, 0, 0.3, 0, 0, 0, 0.4, 0, 0, 0, 0.5, 0, 0, 0.3, 0.5],
      minExtra: 0,
      maxExtra: 2,
      presence: 1,
    },
    {
      voice: "hat",
      anchors: [],
      weights: [
        0.9, 0.2, 0.8, 0.4, 0.9, 0.2, 0.8, 0.5, 0.9, 0.2, 0.8, 0.4, 0.9, 0.2,
        0.8, 0.5,
      ],
      minExtra: 6,
      maxExtra: 11,
      presence: 1,
    },
    {
      voice: "shaker",
      anchors: [],
      weights: [
        0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5,
        0.6, 0.5,
      ],
      minExtra: 8,
      maxExtra: 14,
      presence: 0.5,
    },
    {
      voice: "rim",
      anchors: [],
      weights: [0, 0, 0.3, 0, 0, 0, 0.5, 0, 0, 0.4, 0, 0, 0, 0.5, 0, 0.3],
      minExtra: 2,
      maxExtra: 4,
      presence: 0.35,
    },
    {
      voice: "openHat",
      anchors: [],
      weights: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6, 0, 0, 0, 0.5, 0],
      minExtra: 1,
      maxExtra: 1,
      presence: 0.3,
    },
  ],
  bass: {
    anchors: [0],
    weights: [
      0, 0, 0.1, 0.2, 0.2, 0.1, 0.5, 0.3, 0.1, 0.2, 0.9, 0.1, 0.1, 0.2, 0.4,
      0.3,
    ],
    minExtra: 1,
    maxExtra: 3,
    lengths: [2, 3, 4, 6],
    intervals: [
      { interval: "root", weight: 0.6 },
      { interval: "fifth", weight: 0.2 },
      { interval: "octave", weight: 0.1 },
      { interval: "third", weight: 0.1 },
    ],
    kickInteraction: 0.6,
    walking: false,
  },
  stabs: {
    anchors: [0],
    weights: [
      0, 0, 0.1, 0.2, 0.2, 0.1, 0.4, 0.6, 0, 0.2, 0.7, 0.1, 0, 0.2, 0.4, 0.3,
    ],
    minExtra: 1,
    maxExtra: 3,
  },
};
