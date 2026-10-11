import type { PatternRules } from "../../../models/PatternRules";

const HAT_EIGHTHS = [
  0.9, 0.2, 0.8, 0.4, 0.9, 0.2, 0.8, 0.5, 0.9, 0.2, 0.8, 0.4, 0.9, 0.2, 0.8,
  0.5,
];
const SHAKER_SIXTEENTHS = [
  0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6,
  0.5,
];

export const lofiPatterns: PatternRules = {
  templateChance: 0.12,
  drumGrooves: [
    {
      name: "boom bap",
      rules: [
        {
          voice: "kick",
          anchors: [0],
          weights: [
            0, 0, 0.1, 0.2, 0, 0.2, 0.3, 0.5, 0, 0.5, 0.8, 0.2, 0, 0.2, 0.3,
            0.5,
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
          weights: HAT_EIGHTHS,
          minExtra: 6,
          maxExtra: 11,
          presence: 1,
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
    },
    {
      name: "half time",
      rules: [
        {
          voice: "kick",
          anchors: [0],
          weights: [0, 0, 0, 0.3, 0, 0, 0.3, 0, 0, 0, 0.8, 0.4, 0, 0, 0.3, 0],
          minExtra: 1,
          maxExtra: 2,
          presence: 1,
        },
        {
          voice: "snare",
          anchors: [8],
          weights: [0, 0, 0, 0.2, 0, 0, 0.2, 0, 0, 0, 0, 0.3, 0, 0, 0.3, 0.3],
          minExtra: 0,
          maxExtra: 2,
          presence: 1,
        },
        {
          voice: "hat",
          anchors: [],
          weights: [
            0.9, 0, 0.5, 0, 0.9, 0, 0.5, 0, 0.9, 0, 0.5, 0, 0.9, 0, 0.5, 0,
          ],
          minExtra: 3,
          maxExtra: 6,
          presence: 1,
        },
        {
          voice: "rim",
          anchors: [],
          weights: [0, 0, 0.3, 0, 0, 0, 0.5, 0, 0, 0.4, 0, 0, 0, 0.5, 0, 0.3],
          minExtra: 1,
          maxExtra: 3,
          presence: 0.5,
        },
      ],
    },
    {
      name: "pushed kick",
      rules: [
        {
          voice: "kick",
          anchors: [],
          weights: [
            0.9, 0, 0.2, 0.6, 0, 0, 0.3, 0.5, 0, 0.3, 0.8, 0, 0, 0.2, 0.4, 0,
          ],
          minExtra: 2,
          maxExtra: 4,
          presence: 1,
        },
        {
          voice: "snare",
          anchors: [4, 12],
          weights: [0, 0, 0, 0, 0, 0, 0, 0.3, 0, 0, 0, 0, 0, 0, 0, 0.4],
          minExtra: 0,
          maxExtra: 1,
          presence: 1,
        },
        {
          voice: "shaker",
          anchors: [],
          weights: SHAKER_SIXTEENTHS,
          minExtra: 8,
          maxExtra: 14,
          presence: 1,
        },
        {
          voice: "hat",
          anchors: [],
          weights: [0.9, 0, 0, 0, 0.9, 0, 0, 0, 0.9, 0, 0, 0, 0.9, 0, 0, 0],
          minExtra: 2,
          maxExtra: 4,
          presence: 0.6,
        },
      ],
    },
    {
      name: "rim shuffle",
      rules: [
        {
          voice: "kick",
          anchors: [0],
          weights: [0, 0, 0, 0, 0, 0, 0.6, 0, 0, 0, 0.7, 0.4, 0, 0, 0, 0.3],
          minExtra: 1,
          maxExtra: 3,
          presence: 1,
        },
        {
          voice: "rim",
          anchors: [4, 12],
          weights: [0, 0, 0.3, 0, 0, 0, 0.4, 0, 0, 0.3, 0, 0, 0, 0, 0.4, 0],
          minExtra: 1,
          maxExtra: 3,
          presence: 1,
        },
        {
          voice: "snare",
          anchors: [],
          weights: [0, 0, 0, 0.3, 0, 0, 0, 0.3, 0, 0, 0, 0.3, 0, 0, 0, 0.3],
          minExtra: 0,
          maxExtra: 2,
          presence: 0.4,
        },
        {
          voice: "shaker",
          anchors: [],
          weights: SHAKER_SIXTEENTHS,
          minExtra: 6,
          maxExtra: 12,
          presence: 0.8,
        },
      ],
    },
    {
      name: "clap swing",
      rules: [
        {
          voice: "kick",
          anchors: [0],
          weights: [0, 0, 0, 0, 0, 0, 0, 0.6, 0, 0.6, 0.5, 0, 0, 0.5, 0, 0],
          minExtra: 1,
          maxExtra: 3,
          presence: 1,
        },
        {
          voice: "clap",
          anchors: [4, 12],
          weights: [],
          minExtra: 0,
          maxExtra: 0,
          presence: 1,
        },
        {
          voice: "hat",
          anchors: [],
          weights: [
            0.8, 0.3, 0.8, 0.6, 0.8, 0.3, 0.8, 0.6, 0.8, 0.3, 0.8, 0.6, 0.8,
            0.3, 0.8, 0.6,
          ],
          minExtra: 7,
          maxExtra: 12,
          presence: 1,
        },
        {
          voice: "openHat",
          anchors: [],
          weights: [0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0, 0, 0.6, 0],
          minExtra: 1,
          maxExtra: 1,
          presence: 0.5,
        },
      ],
    },
    {
      name: "sparse",
      rules: [
        {
          voice: "kick",
          anchors: [0],
          weights: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.9, 0, 0, 0, 0, 0],
          minExtra: 0,
          maxExtra: 1,
          presence: 1,
        },
        {
          voice: "snare",
          anchors: [12],
          weights: [0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          minExtra: 0,
          maxExtra: 1,
          presence: 1,
        },
        {
          voice: "brush",
          anchors: [],
          weights: [
            0.7, 0, 0.4, 0, 0.7, 0, 0.4, 0, 0.7, 0, 0.4, 0, 0.7, 0, 0.4, 0,
          ],
          minExtra: 3,
          maxExtra: 7,
          presence: 1,
        },
      ],
    },
  ],
  bass: {
    anchors: [],
    weights: [
      0.9, 0, 0.1, 0.3, 0.2, 0.1, 0.5, 0.4, 0.3, 0.2, 0.9, 0.2, 0.1, 0.3, 0.4,
      0.3,
    ],
    minExtra: 2,
    maxExtra: 4,
    lengths: [2, 3, 4, 6],
    intervals: [
      { interval: "root", weight: 0.5 },
      { interval: "fifth", weight: 0.2 },
      { interval: "octave", weight: 0.15 },
      { interval: "third", weight: 0.15 },
    ],
    kickInteraction: 0.6,
    walking: false,
  },
  stabs: {
    anchors: [],
    weights: [
      0.7, 0, 0.1, 0.3, 0.2, 0.1, 0.4, 0.6, 0.2, 0.2, 0.7, 0.2, 0.1, 0.2, 0.5,
      0.3,
    ],
    minExtra: 1,
    maxExtra: 4,
  },
};
