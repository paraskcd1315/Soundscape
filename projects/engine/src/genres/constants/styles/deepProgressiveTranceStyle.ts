import type { StyleDefinition } from "../../../models/StyleDefinition";
import { PROGRESSIVE_ROLL_BASS } from "../blocks/bassRules.constants";
import { PROGRESSIVE_ROLL, TRANCE_DRIVE } from "../blocks/grooves.constants";
import { PROGRESSIVE_SPACE } from "../blocks/spaces.constants";
import { OFFBEAT_STABS } from "../blocks/stabRules.constants";
import { TRANCE_FAMILY } from "../families/tranceFamily";
import { progressiveForm } from "../forms/clubForms";
import {
  MINOR_SEVENTHS,
  SLOW_PAIR,
  TWO_CHORD_DEEP,
} from "../progressions.constants";

export const deepProgressiveTranceStyle: StyleDefinition = {
  ...TRANCE_FAMILY,
  id: "deepProgressiveTrance",
  tempoRange: { min: 126, max: 134 },
  defaultTempo: 130,
  defaultBrightness: 0.5,
  scaleIds: ["minor", "dorian", "phrygian"],
  defaultScaleId: "dorian",
  progressions: [TWO_CHORD_DEEP, SLOW_PAIR, MINOR_SEVENTHS],
  chords: {
    ...TRANCE_FAMILY.chords,
    voice: "pluck",
    rhythm: "arp",
    simpleSize: 4,
    richSize: 5,
    velocity: 0.4,
  },
  melody: {
    ...TRANCE_FAMILY.melody,
    voice: "softLead",
    restChance: 0.5,
    maximumNotes: 5,
  },
  pad: { voice: "pad", size: 4, velocity: 0.44, minimumEnergy: 0.05 },
  variants: {
    ...TRANCE_FAMILY.variants,
    chordVoices: ["pluck", "pluck", "junoPad"],
    melodyVoices: ["softLead", "pluck", "bell"],
    padVoices: ["pad", "junoPad", "strings"],
  },
  patterns: {
    templateChance: 0.4,
    drumGrooves: [PROGRESSIVE_ROLL, TRANCE_DRIVE],
    bass: PROGRESSIVE_ROLL_BASS,
    stabs: OFFBEAT_STABS,
  },
  form: progressiveForm,
  space: PROGRESSIVE_SPACE,
  palette: {
    backgroundTop: "#020d14",
    backgroundBottom: "#0b3b45",
    accents: {
      drums: "#5ff2d6",
      bass: "#1a8f8f",
      chords: "#7ae8ff",
      pad: "#0f4b5c",
      melody: "#d6fff6",
      counter: "#9be7d8",
      texture: "#e9fffb",
    },
  },
};
