import type { StyleDefinition } from "../../../models/StyleDefinition";
import { EPIC_SPACE } from "../blocks/spaces.constants";
import { TRANCE_FAMILY } from "../families/tranceFamily";
import { anthemForm } from "../forms/clubForms";
import {
  HARMONIC_DRAMA,
  MINOR_EPIC,
  DARK_PHRYGIAN,
} from "../progressions.constants";

export const epicTranceStyle: StyleDefinition = {
  ...TRANCE_FAMILY,
  id: "epicTrance",
  tempoRange: { min: 134, max: 140 },
  defaultTempo: 138,
  defaultReverb: 0.55,
  scaleIds: ["harmonicMinor", "minor", "phrygian"],
  defaultScaleId: "harmonicMinor",
  progressions: [HARMONIC_DRAMA, MINOR_EPIC, DARK_PHRYGIAN],
  pad: { voice: "choir", size: 4, velocity: 0.48, minimumEnergy: 0.05 },
  chords: {
    ...TRANCE_FAMILY.chords,
    voice: "strings",
    rhythm: "held",
    velocity: 0.55,
  },
  melody: {
    ...TRANCE_FAMILY.melody,
    voice: "supersaw",
    restChance: 0.25,
    noteLengthSteps: [2, 3, 4, 6],
  },
  variants: {
    ...TRANCE_FAMILY.variants,
    chordVoices: ["strings", "supersaw", "brass"],
    melodyVoices: ["supersaw", "brass", "supersaw"],
    padVoices: ["choir", "strings"],
    counterVoices: ["supersaw", "pluck", "bell"],
  },
  form: anthemForm,
  space: EPIC_SPACE,
  palette: {
    backgroundTop: "#140308",
    backgroundBottom: "#4a0c1e",
    accents: {
      drums: "#ffcf6e",
      bass: "#c4243f",
      chords: "#ff8a5c",
      pad: "#5a1022",
      melody: "#fff1c9",
      counter: "#ffb27a",
      texture: "#fff8e6",
    },
  },
};
