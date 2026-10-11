import type { PatternRules } from "../../domain/model/PatternRules";

export const technoPatterns: PatternRules = {
  templateChance: 0.55,
  drumGrooves: [
    {
      name: "four on the floor",
      rules: [
        {
          voice: "kick",
          anchors: [0, 4, 8, 12],
          weights: [],
          minExtra: 0,
          maxExtra: 0,
          presence: 1,
        },
        {
          voice: "clap",
          anchors: [4, 12],
          weights: [0, 0, 0, 0, 0, 0, 0, 0.4, 0, 0, 0, 0, 0, 0, 0, 0.5],
          minExtra: 0,
          maxExtra: 1,
          presence: 0.95,
        },
        {
          voice: "hat",
          anchors: [2, 6, 10, 14],
          weights: [
            0, 0.5, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0.6,
          ],
          minExtra: 2,
          maxExtra: 6,
          presence: 1,
        },
        {
          voice: "openHat",
          anchors: [],
          weights: [0, 0, 0, 0, 0, 0, 0.8, 0, 0, 0, 0.4, 0, 0, 0, 0.8, 0],
          minExtra: 1,
          maxExtra: 2,
          presence: 0.75,
        },
        {
          voice: "perc",
          anchors: [],
          weights: [
            0, 0, 0.3, 0.6, 0, 0.3, 0.5, 0.4, 0, 0.4, 0.3, 0.6, 0, 0.5, 0.4,
            0.7,
          ],
          minExtra: 2,
          maxExtra: 5,
          presence: 0.85,
        },
        {
          voice: "rim",
          anchors: [],
          weights: [
            0, 0.4, 0, 0.5, 0, 0.4, 0, 0.5, 0, 0.4, 0, 0.5, 0, 0.4, 0, 0.5,
          ],
          minExtra: 2,
          maxExtra: 4,
          presence: 0.4,
        },
        {
          voice: "shaker",
          anchors: [],
          weights: [
            0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6,
            0.6, 0.6, 0.6,
          ],
          minExtra: 6,
          maxExtra: 10,
          presence: 0.5,
        },
      ],
    },
  ],
  bass: {
    anchors: [],
    weights: [0, 0.3, 1, 0.7, 0, 0.3, 1, 0.7, 0, 0.3, 1, 0.7, 0, 0.3, 1, 0.8],
    minExtra: 4,
    maxExtra: 9,
    lengths: [1, 2],
    intervals: [
      { interval: "root", weight: 0.72 },
      { interval: "octave", weight: 0.2 },
      { interval: "fifth", weight: 0.08 },
    ],
    kickInteraction: -0.8,
    walking: false,
  },
  stabs: {
    anchors: [],
    weights: [0, 0, 0.2, 0.9, 0, 0, 0.3, 0.9, 0, 0, 0.3, 0.9, 0, 0.1, 0.3, 0.8],
    minExtra: 2,
    maxExtra: 4,
  },
};
