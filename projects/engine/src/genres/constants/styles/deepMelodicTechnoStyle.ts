import type { StyleDefinition } from "../../../models/StyleDefinition";
import { MELODIC_TECHNO_FAMILY } from "../families/melodicTechnoFamily";
import { dubForm } from "../forms/clubForms";
import { DRONE, SLOW_PAIR, TWO_CHORD_DEEP } from "../progressions.constants";
import { bassSteps } from "../../utils/bassSteps.util";

export const deepMelodicTechnoStyle: StyleDefinition = {
  ...MELODIC_TECHNO_FAMILY,
  id: "deepMelodicTechno",
  tempoRange: { min: 118, max: 124 },
  defaultTempo: 121,
  defaultBrightness: 0.4,
  defaultReverb: 0.6,
  scaleIds: ["phrygian", "minor", "dorian"],
  defaultScaleId: "phrygian",
  progressions: [DRONE, SLOW_PAIR, TWO_CHORD_DEEP],
  bass: {
    voice: "subBass",
    baseMidi: 33,
    minimumEnergy: 0.1,
    patterns: [bassSteps([0, 2, 4, 6, 8, 10, 12, 14], 2)],
  },
  melody: {
    ...MELODIC_TECHNO_FAMILY.melody,
    voice: "pluck",
    restChance: 0.55,
    maximumNotes: 4,
  },
  texture: { kind: "arp", voice: "pluck", baseMidi: 70, chance: 0.45 },
  variants: {
    ...MELODIC_TECHNO_FAMILY.variants,
    melodyVoices: ["pluck", "softLead", "bell"],
    bassVoices: ["subBass", "reese"],
  },
  form: dubForm,
  palette: {
    backgroundTop: "#02040a",
    backgroundBottom: "#0d1b2a",
    accents: {
      drums: "#778da9",
      bass: "#1b263b",
      chords: "#415a77",
      pad: "#0d1b2a",
      melody: "#e0e1dd",
      counter: "#a9b8cf",
      texture: "#f0f2f5",
    },
  },
};
