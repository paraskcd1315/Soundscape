import type { StyleDefinition } from "../../../models/StyleDefinition";
import { MELODIC_TECHNO_SPACE } from "../blocks/spaces.constants";
import { PROGRESSIVE_FAMILY } from "../families/progressiveFamily";
import {
  MINOR_EPIC,
  MINOR_LIFT,
  TWO_CHORD_DEEP,
} from "../progressions.constants";

export const melodicProgressiveStyle: StyleDefinition = {
  ...PROGRESSIVE_FAMILY,
  id: "melodicProgressive",
  tempoRange: { min: 118, max: 126 },
  defaultTempo: 122,
  defaultBrightness: 0.55,
  progressions: [MINOR_EPIC, MINOR_LIFT, TWO_CHORD_DEEP],
  melody: {
    ...PROGRESSIVE_FAMILY.melody,
    voice: "softLead",
    restChance: 0.35,
    maximumNotes: 7,
  },
  texture: { kind: "arp", voice: "pluck", baseMidi: 74, chance: 0.5 },
  pad: { voice: "junoPad", size: 4, velocity: 0.4, minimumEnergy: 0.05 },
  variants: {
    ...PROGRESSIVE_FAMILY.variants,
    melodyVoices: ["softLead", "pluck", "supersaw"],
    padVoices: ["junoPad", "pad", "strings"],
  },
  space: MELODIC_TECHNO_SPACE,
  palette: {
    backgroundTop: "#120a1c",
    backgroundBottom: "#3d1d4f",
    accents: {
      drums: "#ffb3e6",
      bass: "#9d4edd",
      chords: "#e0aaff",
      pad: "#5a189a",
      melody: "#fff0fb",
      counter: "#f7c6ff",
      texture: "#fff7fd",
    },
  },
};
