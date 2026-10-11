import type { StyleGroup } from "../types/StyleGroup";

export const STYLE_GROUPS: readonly StyleGroup[] = [
  {
    label: "Ambient & Space",
    styleIds: ["ambient", "spaceDreams", "dreamlandWaves"],
  },
  {
    label: "Chill & Lounge",
    styleIds: ["chillout", "lounge", "downtempoLounge", "futureChill"],
  },
  {
    label: "Lo-fi & Jazz",
    styleIds: ["lofi", "lofiLounge", "smoothLofi", "jazz"],
  },
  {
    label: "House",
    styleIds: ["deepHouse", "deepProgressiveHouse", "chillHouse", "techHouse"],
  },
  {
    label: "Progressive & Trance",
    styleIds: [
      "progressive",
      "melodicProgressive",
      "deepProgressiveTrance",
      "trance",
      "epicTrance",
    ],
  },
  {
    label: "Techno",
    styleIds: [
      "techno",
      "melodicHouseTechno",
      "deepMelodicTechno",
      "dubTechno",
    ],
  },
  {
    label: "Synth & Festival",
    styleIds: ["retroWave", "cyberpunk", "chiptune", "edm"],
  },
];
