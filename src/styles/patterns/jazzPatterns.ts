import type { PatternRules } from "../../domain/model/PatternRules";

export const jazzPatterns: PatternRules = {
  templateChance: 0.1,
  drumGrooves: [
    {
      name: "ride swing",
      rules: [
        {
          voice: "ride",
          anchors: [0, 4, 8, 12],
          weights: [
            0, 0, 0, 0.2, 0, 0.2, 0.9, 0, 0, 0.2, 0, 0.2, 0, 0.2, 0.9, 0.2,
          ],
          minExtra: 2,
          maxExtra: 3,
          presence: 1,
        },
        {
          voice: "hat",
          anchors: [4, 12],
          weights: [],
          minExtra: 0,
          maxExtra: 0,
          presence: 1,
        },
        {
          voice: "kick",
          anchors: [],
          weights: [
            0.4, 0, 0, 0.2, 0, 0, 0.15, 0, 0.3, 0, 0, 0.2, 0, 0, 0.15, 0,
          ],
          minExtra: 0,
          maxExtra: 2,
          presence: 0.7,
        },
        {
          voice: "snare",
          anchors: [],
          weights: [
            0, 0, 0, 0.4, 0, 0, 0.3, 0.5, 0, 0, 0.3, 0.5, 0, 0.3, 0, 0.5,
          ],
          minExtra: 1,
          maxExtra: 4,
          presence: 0.95,
        },
      ],
    },
    {
      name: "brushes",
      rules: [
        {
          voice: "brush",
          anchors: [0, 4, 8, 12],
          weights: [0, 0, 0.5, 0, 0, 0, 0.6, 0, 0, 0, 0.5, 0, 0, 0, 0.6, 0],
          minExtra: 2,
          maxExtra: 4,
          presence: 1,
        },
        {
          voice: "hat",
          anchors: [4, 12],
          weights: [],
          minExtra: 0,
          maxExtra: 0,
          presence: 0.8,
        },
        {
          voice: "snare",
          anchors: [],
          weights: [0, 0, 0, 0.3, 0, 0, 0.2, 0.3, 0, 0, 0, 0.3, 0, 0, 0.2, 0.3],
          minExtra: 0,
          maxExtra: 2,
          presence: 0.5,
        },
        {
          voice: "kick",
          anchors: [],
          weights: [0.3, 0, 0, 0, 0, 0, 0, 0, 0.3, 0, 0, 0, 0, 0, 0, 0],
          minExtra: 0,
          maxExtra: 1,
          presence: 0.5,
        },
      ],
    },
    {
      name: "two feel",
      rules: [
        {
          voice: "ride",
          anchors: [0, 4, 8, 12],
          weights: [0, 0, 0, 0, 0, 0, 0.8, 0, 0, 0, 0, 0, 0, 0, 0.8, 0],
          minExtra: 1,
          maxExtra: 2,
          presence: 1,
        },
        {
          voice: "hat",
          anchors: [4, 12],
          weights: [],
          minExtra: 0,
          maxExtra: 0,
          presence: 1,
        },
        {
          voice: "kick",
          anchors: [],
          weights: [0.6, 0, 0, 0, 0, 0, 0, 0, 0.6, 0, 0, 0, 0, 0, 0, 0],
          minExtra: 1,
          maxExtra: 2,
          presence: 0.9,
        },
        {
          voice: "snare",
          anchors: [],
          weights: [0, 0, 0, 0, 0, 0, 0, 0.4, 0, 0, 0, 0, 0, 0, 0, 0.4],
          minExtra: 0,
          maxExtra: 2,
          presence: 0.7,
        },
      ],
    },
  ],
  bass: {
    anchors: [0, 4, 8, 12],
    weights: [],
    minExtra: 0,
    maxExtra: 0,
    lengths: [4],
    intervals: [],
    kickInteraction: 0,
    walking: true,
  },
  stabs: {
    anchors: [],
    weights: [0.7, 0, 0, 0.4, 0, 0, 0.5, 0.8, 0, 0.3, 0.6, 0, 0.2, 0, 0.4, 0.5],
    minExtra: 2,
    maxExtra: 4,
  },
};
