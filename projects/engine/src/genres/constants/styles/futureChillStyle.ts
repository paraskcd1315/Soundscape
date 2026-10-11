import type { StyleDefinition } from "../../../models/StyleDefinition";
import { TWO_STEP_SUB } from "../blocks/bassRules.constants";
import { TWO_STEP } from "../blocks/grooves.constants";
import { FUTURE_SPACE } from "../blocks/spaces.constants";
import { CHILL_FAMILY } from "../families/chillFamily";
import { MINOR_EPIC, TWO_CHORD_DEEP } from "../progressions.constants";
import { grooveGrids } from "../../utils/grooveGrids.util";
import { bassSteps } from "../../utils/bassSteps.util";

export const futureChillStyle: StyleDefinition = {
  ...CHILL_FAMILY,
  id: "futureChill",
  tempoRange: { min: 126, max: 140 },
  defaultTempo: 132,
  swingRange: { min: 0.05, max: 0.3 },
  defaultSwing: 0.16,
  humanizeScale: 0.7,
  scaleIds: ["minor", "dorian", "phrygian"],
  defaultScaleId: "minor",
  progressions: [TWO_CHORD_DEEP, MINOR_EPIC],
  drums: {
    ...CHILL_FAMILY.drums,
    grids: grooveGrids(TWO_STEP),
    fillVoice: "clap",
  },
  bass: {
    voice: "reese",
    baseMidi: 33,
    minimumEnergy: 0.1,
    patterns: [bassSteps([0, 10], 6), bassSteps([0, 6, 10], 4)],
  },
  chords: {
    ...CHILL_FAMILY.chords,
    voice: "junoPad",
    rhythm: "held",
    velocity: 0.42,
  },
  melody: {
    ...CHILL_FAMILY.melody,
    voice: "vocalChop",
    restChance: 0.45,
    noteLengthSteps: [1, 2, 3],
  },
  counter: { ...CHILL_FAMILY.counter, voice: "pluck" },
  pad: { voice: "pad", size: 4, velocity: 0.34, minimumEnergy: 0.05 },
  variants: {
    ...CHILL_FAMILY.variants,
    chordVoices: ["junoPad", "pad", "rhodes"],
    melodyVoices: ["vocalChop", "pluck", "bell"],
    bassVoices: ["reese", "subBass"],
    counterVoices: ["pluck", "vocalChop", "bell"],
    drumKits: [],
  },
  patterns: {
    templateChance: 0.45,
    drumGrooves: [TWO_STEP],
    bass: TWO_STEP_SUB,
    stabs: null,
  },
  space: FUTURE_SPACE,
  palette: {
    backgroundTop: "#020617",
    backgroundBottom: "#1e1b4b",
    accents: {
      drums: "#a5b4fc",
      bass: "#4338ca",
      chords: "#818cf8",
      pad: "#312e81",
      melody: "#e0e7ff",
      counter: "#c7d2fe",
      texture: "#eef2ff",
    },
  },
};
